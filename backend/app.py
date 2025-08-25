import os
import joblib
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# === Configuration ===
FRONTEND_ORIGINS = ["http://localhost:5173"]  # adjust exactly to your frontend origin
FEATURES = [
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction",
    "Age"
]
MODEL_PATH = "diabetes.pkl"
SCALER_PATH = "scaler.pkl"  # optional: only if you used one during training

# === Schemas ===
class DiabetesInput(BaseModel):
    Pregnancies: float
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: float

class PredictionResponse(BaseModel):
    prediction: int
    probability: float

# === App initialization ===
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Load artifacts ===
def load_artifact(path: str):
    if not os.path.exists(path):
        raise FileNotFoundError(f"{path} not found in {os.getcwd()}")
    return joblib.load(path)

try:
    model = load_artifact(MODEL_PATH)
    print(f"Loaded model from {MODEL_PATH}")
except Exception as e:
    print(f"Fatal: could not load model: {e}")
    raise

scaler = None
if os.path.exists(SCALER_PATH):
    try:
        scaler = load_artifact(SCALER_PATH)
        print(f"Loaded scaler from {SCALER_PATH}")
    except Exception as e:
        print("Warning: failed to load scaler, continuing without it:", e)

# === Helpers ===
def build_feature_array(data: DiabetesInput) -> np.ndarray:
    df = pd.DataFrame([[getattr(data, f) for f in FEATURES]], columns=FEATURES)
    if scaler is not None:
        try:
            transformed = scaler.transform(df)
            return transformed
        except Exception as e:
            print("Scaler transform failed, using raw features:", e)
    return df.values

# === Endpoints ===
@app.get("/")
def health():
    return {"status": "OK"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(data: DiabetesInput, request: Request):
    try:
        raw = await request.json()
        print("Received payload:", raw)

        X = build_feature_array(data)
        print("Feature array passed to model:", X)

        y_pred = model.predict(X)[0]
        if hasattr(model, "predict_proba"):
            y_prob = float(model.predict_proba(X)[0][1])
        else:
            y_prob = 1.0 if y_pred == 1 else 0.0

        print(f"Prediction: {y_pred}, Probability: {y_prob}")
        return PredictionResponse(prediction=int(y_pred), probability=y_prob)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
