# MachineSense 🏭

AI-Powered Machine Identification Platform for Factory Environments.

## What it does
- Factory managers upload machine images and train a custom AI model with one click
- Employees identify any machine instantly by taking a photo
- Each company gets their own isolated AI model (Multi-tenant)

## Tech Stack
- **Frontend:** React + Tailwind CSS
- **Backend:** FastAPI (Python)
- **AI/ML:** TensorFlow + ResNet50 (Transfer Learning)
- **Database:** SQLite via SQLModel
- **Auth:** JWT Tokens

## Features
- ✅ Company Registration & Login
- ✅ Employee Management
- ✅ Image Upload (ZIP)
- ✅ One-Click AI Training (97%+ accuracy)
- ✅ Real-time Machine Identification
- ✅ Safety Warnings Display
- ✅ Multi-tenant Architecture

## Setup
### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
