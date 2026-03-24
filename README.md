# 🩺 Diabetes Risk Assessment System

## 🎯 Overview
The **Diabetes Risk Assessment System** is a full-stack web application that leverages machine learning to predict diabetes risk based on clinical parameters.

This project is based on the research paper **"Enhanced Early Detection of Diabetes Through Ensemble and Supervised Learning Techniques"**, accepted and presented at **RDCAPE 2025**.

### Key Highlights
- 🤖 Advanced ML model with 92.31% accuracy
- 🎨 Modern, responsive web interface
- ⚡ Real-time risk assessment
- 📊 Visual probability representation
- 🔒 Privacy-focused (no data storage)


## 🛠️ Tech Stack

### Frontend
- **React** 19.1.0 - Modern UI framework
- **Vite** 7.0.4 - Lightning-fast build tool
- **Tailwind CSS** 4.1.11 - Utility-first styling
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations

### Backend
- **Python** 3.12
- **FastAPI** - High-performance web framework
- **Scikit-learn** 1.7.1 - Machine learning library
- **Pandas** 2.2.3 - Data manipulation
- **NumPy** 2.3.2 - Numerical computing
- **Joblib** - Model serialization
- **Uvicorn** - ASGI server

### Machine Learning
- **Random Forest Classifier** (Primary Model)
- **Ensemble Learning Techniques**
- **Supervised Learning Algorithms**


## 📄 Research Paper

### Publication Details

**Title:** Enhanced Early Detection of Diabetes Through Ensemble and Supervised Learning Techniques

**Conference:** RDCAPE 2025 - Recent Developments in Control, Automation & Power Engineering

### Status
- ✅ **Paper accepted** for publication in **RDCAPE 2025**
- ✅ Submitted for final publication
- 🔜 DOI link will be added after official publication

## 📚 Dataset Information

The project uses the **Pima Indians Diabetes Dataset**, a widely used benchmark dataset for binary diabetes classification.
Kaggle:-  (https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database)

### Features (8 Clinical Parameters)

| Feature | Description | Unit |
|---------|-------------|------|
| **Pregnancies** | Number of times pregnant | count |
| **Glucose** | Plasma glucose concentration | mg/dL |
| **Blood Pressure** | Diastolic blood pressure | mmHg |
| **Skin Thickness** | Triceps skin fold thickness | mm |
| **Insulin** | 2-Hour serum insulin | μU/mL |
| **BMI** | Body mass index | kg/m² |
| **Diabetes Pedigree Function** | Genetic predisposition score | - |
| **Age** | Age of the patient | years |

**Target Variable:** Outcome (0 = No Diabetes, 1 = Diabetes)

---

## 🏆 Model Performance

### Comparative Analysis

| Model | Mean Accuracy (%) |
|-------|------------------|
| Logistic Regression | 87.51 |
| Decision Tree | 86.71 |
| Gradient Boosting | 92.31 |
| **Random Forest** ⭐ | **92.31** |
| XGBoost | 92.05 |

**Selected Model:** Random Forest (Best Performance - 92.31% Accuracy)
