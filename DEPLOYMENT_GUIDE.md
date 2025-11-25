# Deployment Steps to Fix CORS

## Backend Deployment (Vercel)

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Select repository: `dharambir007/Diabetes-Risk-Assessment`
4. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - Click "Deploy"

5. After deployment, copy your backend URL (e.g., `https://your-backend-name.vercel.app`)

## Frontend Configuration (Vercel)

1. Go to your frontend project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-name.vercel.app` (paste your actual backend URL)
4. Click "Save"
5. Go to "Deployments" → Click latest deployment → "Redeploy"

## That's it! CORS will be resolved. ✅

Your backend already has:
- CORS enabled for all origins (`allow_origins=["*"]`)
- Environment variable support in frontend to use the deployed backend URL
