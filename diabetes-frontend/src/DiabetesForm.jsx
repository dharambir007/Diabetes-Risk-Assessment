import React, { useState } from "react";
import { 
  Activity, 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  Loader2, 
  Stethoscope, 
  TrendingUp,
  Shield,
  BarChart3,
  Brain,
  Zap
} from "lucide-react";

const initialState = {
  Pregnancies: "",
  Glucose: "",
  BloodPressure: "",
  SkinThickness: "",
  Insulin: "",
  BMI: "",
  DiabetesPedigreeFunction: "",
  Age: ""
};

const fieldLabels = {
  Pregnancies: "Number of Pregnancies",
  Glucose: "Glucose Level (mg/dL)",
  BloodPressure: "Blood Pressure (mmHg)",
  SkinThickness: "Skin Thickness (mm)",
  Insulin: "Insulin Level (μU/mL)",
  BMI: "Body Mass Index",
  DiabetesPedigreeFunction: "Diabetes Pedigree Function",
  Age: "Age (years)"
};

const fieldIcons = {
  Pregnancies: Heart,
  Glucose: Zap,
  BloodPressure: Activity,
  SkinThickness: Shield,
  Insulin: BarChart3,
  BMI: TrendingUp,
  DiabetesPedigreeFunction: Brain,
  Age: Stethoscope
};

const DiabetesForm = () => {
  const [values, setValues] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const payload = {};
    for (const key in values) {
      payload[key] = Number(values[key]);
    }
    console.log("submitting payload:", payload);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const resp = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const errBody = await resp.json().catch(() => ({}));
        setResult({ error: errBody.detail || `Server returned ${resp.status}` });
      } else {
        const data = await resp.json();
        setResult(data);
      }
    } catch (error) {
      setResult({ error: "Network or CORS error: " + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <Stethoscope className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
            Diabetes Risk
            <span className="block text-5xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Assessment
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Advanced AI-powered diagnostic tool leveraging machine learning algorithms 
            to provide comprehensive diabetes risk analysis based on clinical biomarkers
          </p>
          
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-slate-400">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Clinical Grade</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">Patient Information</h2>
              <p className="text-slate-300">Please provide accurate clinical measurements for optimal prediction accuracy</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.keys(initialState).map((field, index) => {
                  const IconComponent = fieldIcons[field];
                  return (
                    <div
                      key={field}
                      className={`group relative transition-all duration-500 ${
                        focusedField === field ? 'scale-105 z-10' : ''
                      }`}
                    >
                      <div className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 ${
                        focusedField === field
                          ? 'border-purple-400 shadow-2xl shadow-purple-500/20 bg-white/10'
                          : 'border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl'
                      }`}>
                        
                        <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                          focusedField === field ? 'text-purple-400 scale-110' : 'text-slate-400 group-hover:text-slate-300'
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>

                        <div className="pl-16 pr-6 py-6">
                          <label className={`block text-sm font-bold mb-3 transition-colors duration-300 ${
                            focusedField === field ? 'text-purple-300' : 'text-slate-300'
                          }`}>
                            {fieldLabels[field]}
                          </label>
                          
                          <input
                            type="number"
                            name={field}
                            value={values[field]}
                            onChange={handleChange}
                            onFocus={() => handleFocus(field)}
                            onBlur={handleBlur}
                            required
                            step="any"
                            className={`w-full text-lg font-semibold bg-transparent border-0 outline-none transition-all duration-300 ${
                              focusedField === field 
                                ? 'text-white placeholder-purple-300' 
                                : 'text-slate-200 placeholder-slate-500'
                            }`}
                            placeholder="Enter value"
                          />
                        </div>

                        {focusedField === field && (
                          <div className="absolute inset-0 rounded-2xl ring-4 ring-purple-500/30 animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-8">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`group relative w-full py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    loading
                      ? 'bg-slate-600 cursor-not-allowed shadow-lg text-slate-300'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-2xl hover:shadow-purple-500/25 text-white'
                  }`}
                >
                  <div className="flex items-center justify-center gap-4">
                    {loading ? (
                      <>
                        <Loader2 className="w-7 h-7 animate-spin" />
                        <span>Processing Analysis...</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                        <span>Generate Risk Assessment</span>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="mt-12">
              <div className={`relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border-2 p-10 overflow-hidden ${
                result.error 
                  ? 'border-red-400/30 bg-red-500/5' 
                  : result.prediction === 1 
                    ? 'border-amber-400/30 bg-amber-500/5'
                    : 'border-emerald-400/30 bg-emerald-500/5'
              }`}>
                
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  result.error 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                    : result.prediction === 1 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                }`}></div>

                {result.error ? (
                  <div className="text-center py-8">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl">
                      <AlertTriangle className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-red-400 mb-4">Analysis Error</h3>
                    <p className="text-lg text-red-300 bg-red-500/10 rounded-xl p-4 max-w-2xl mx-auto border border-red-500/20">{result.error}</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className={`w-32 h-32 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300 ${
                        result.prediction === 1 
                          ? 'bg-gradient-to-br from-amber-500 to-orange-600' 
                          : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                      }`}>
                        {result.prediction === 1 ? (
                          <AlertTriangle className="w-16 h-16 text-white animate-pulse" />
                        ) : (
                          <CheckCircle className="w-16 h-16 text-white animate-pulse" />
                        )}
                      </div>
                      
                      <h3 className={`text-4xl font-black mb-3 ${
                        result.prediction === 1 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {result.prediction === 1 ? "Elevated Risk Detected" : "Low Risk Profile"}
                      </h3>
                      
                      <p className={`text-xl font-medium ${
                        result.prediction === 1 ? 'text-amber-300' : 'text-emerald-300'
                      }`}>
                        Risk Classification: {result.prediction === 1 ? "High Risk" : "Low Risk"}
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-2xl font-bold text-white">Probability Analysis</h4>
                        <div className={`px-6 py-3 rounded-full font-black text-xl ${
                          result.prediction === 1 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {(result.probability * 100).toFixed(1)}%
                        </div>
                      </div>
                      
                      <div className="relative h-8 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className={`h-full rounded-full transition-all duration-2000 ease-out ${
                            result.prediction === 1 
                              ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500' 
                              : 'bg-gradient-to-r from-emerald-400 via-teal-500 to-green-500'
                          }`}
                          style={{ width: `${result.probability * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className={`rounded-2xl p-8 border-2 backdrop-blur-sm ${
                      result.prediction === 1 
                        ? 'bg-amber-500/10 border-amber-500/30' 
                        : 'bg-emerald-500/10 border-emerald-500/30'
                    }`}>
                      <div className="flex items-start gap-6">
                        <div className={`p-4 rounded-2xl ${
                          result.prediction === 1 ? 'bg-amber-500/20' : 'bg-emerald-500/20'
                        }`}>
                          <Heart className={`w-8 h-8 ${
                            result.prediction === 1 ? 'text-amber-400' : 'text-emerald-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-2xl font-bold mb-3 ${
                            result.prediction === 1 ? 'text-amber-300' : 'text-emerald-300'
                          }`}>
                            Clinical Recommendation
                          </h4>
                          <p className={`text-lg leading-relaxed ${
                            result.prediction === 1 ? 'text-amber-200' : 'text-emerald-200'
                          }`}>
                            {result.prediction === 1
                              ? "Based on the analysis, we recommend immediate consultation with a healthcare professional for comprehensive evaluation and potential preventive measures. Early intervention can significantly reduce diabetes risk."
                              : "Your current risk profile indicates a healthy metabolic state. Continue maintaining your current lifestyle with regular health monitoring and periodic assessments."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Medical AI Assistant</span>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            This diagnostic tool utilizes advanced machine learning algorithms trained on clinical datasets. 
            Results are for informational purposes and should not replace professional medical consultation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiabetesForm;