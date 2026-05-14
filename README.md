# MachineSense ⚙️
### AI-Powered Factory Machine Identification Platform

![CI/CD](https://github.com/Naseefnf/machinesense/actions/workflows/deploy.yml/badge.svg)

> Empowering factory workers to identify any machine instantly using AI — no expert needed.

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [machinesense-omega.vercel.app](https://machinesense-omega.vercel.app) |
| **Backend API** | [machinesense-backend.onrender.com](https://machinesense-backend.onrender.com) |
| **API Docs** | [machinesense-backend.onrender.com/docs](https://machinesense-backend.onrender.com/docs) |

> ⚠️ **Demo Note:** ML training and prediction require a dedicated GPU server. The full ML pipeline can be demonstrated locally using Docker.

---

## 📖 The Problem

New factory employees struggle to identify machines on the factory floor. Knowledge transfer relies purely on word of mouth — creating safety risks and slowing down onboarding.

**Inspired by a real mechanical engineer** at a conveyor belt assembly company who observed this problem daily.

---

## ✅ The Solution

MachineSense is a **multi-tenant SaaS platform** that allows factory companies to:

- Upload their own machine images
- Train a custom AI model with **one click** — no coding required
- Allow employees to identify any machine instantly by taking a photo
- Display machine **name, description, and safety warnings** in real time

---

## 🚀 Features

### Manager Dashboard
- ✅ Company registration and private workspace
- ✅ Drag and drop ZIP image upload
- ✅ Machine label management (add, edit, delete)
- ✅ One-click AI training with progress bar
- ✅ Training results with accuracy metrics
- ✅ Add machine descriptions and safety warnings
- ✅ Employee account management

### Employee View
- ✅ Camera capture directly from smartphone
- ✅ Upload image from gallery
- ✅ Instant machine identification
- ✅ Confidence score display
- ✅ Machine description card
- ✅ Safety warnings panel

### Platform
- ✅ Multi-tenant architecture (complete company isolation)
- ✅ JWT role-based authentication (Manager/Employee)
- ✅ Docker containerized
- ✅ CI/CD with GitHub Actions
- ✅ Auto-deploy on push to main

---

## 🤖 AI / ML

| Detail | Value |
|--------|-------|
| Model | ResNet50 (Transfer Learning) |
| Pre-trained on | ImageNet (1.2M images) |
| Validation Accuracy | 97-100% |
| Minimum images needed | ~80 per machine class |
| Training time | 1-3 minutes (CPU) |
| Augmentation | Rotation, flip, zoom, brightness |
| Regularization | Dropout (0.5) |

**Why Transfer Learning?**
Factory companies have limited image data. ResNet50 already understands shapes, textures, and visual patterns from 1.2 million images. We only teach it to distinguish between YOUR specific machines.

---

## 🏗️ Architecture

React Frontend (Vercel)
↕ REST API
FastAPI Backend (Render)
↕
┌────┴────┐
ML Pipeline  SQLite DB
(ResNet50)   (SQLModel)
↕
Image Storage
(Per-company folders)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Tailwind CSS + Framer Motion |
| Backend | FastAPI + Uvicorn |
| AI/ML | TensorFlow + ResNet50 + Keras |
| Database | SQLite + SQLModel |
| Auth | JWT Tokens + bcrypt |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 📁 Project Structure

machinesense/
├── .github/
│   └── workflows/
│       └── deploy.yml      ← CI/CD pipeline
├── backend/
│   ├── app/
│   │   ├── ml/
│   │   │   ├── train.py    ← ResNet50 training pipeline
│   │   │   └── predict.py  ← Prediction pipeline
│   │   ├── routers/
│   │   │   ├── auth.py     ← Registration & Login
│   │   │   ├── machines.py ← Machine management
│   │   │   ├── train.py    ← Training endpoint
│   │   │   ├── predict.py  ← Prediction endpoint
│   │   │   └── users.py    ← Employee management
│   │   ├── models.py       ← Database tables
│   │   ├── schemas.py      ← Pydantic schemas
│   │   ├── database.py     ← DB engine & session
│   │   └── security.py     ← JWT & password hashing
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/          ← 8 React pages
│   │   ├── components/     ← Navbar, ProtectedRoute
│   │   └── services/
│   │       └── api.js      ← Axios API calls
│   └── Dockerfile
├── docker-compose.yml
└── README.md

---

## 🗄️ Database Schema

companies
├── id, name, email, password_hash, created_at
machines
├── id, company_id, label, description, safety_warning
users
├── id, company_id, name, email, password_hash, role
train_logs
├── id, company_id, accuracy, trained_at, model_path

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /auth/register | Register company | Public |
| POST | /auth/login | Manager login | Public |
| POST | /users/create-employee | Create employee | Manager |
| POST | /users/employee-login | Employee login | Public |
| POST | /machines/upload | Upload ZIP images | Manager |
| GET | /machines/ | List all machines | Manager |
| PATCH | /machines/{id} | Update machine | Manager |
| DELETE | /machines/{id} | Delete machine | Manager |
| POST | /train/ | Train AI model | Manager |
| POST | /predict/ | Identify machine | Employee |

---

## 🐳 Run Locally with Docker

**Prerequisites:** Docker + Docker Compose installed

```bash
# Clone repository
git clone https://github.com/Naseefnf/machinesense.git
cd machinesense

# Start everything
docker-compose up --build

# Frontend → http://localhost:3000
# Backend  → http://localhost:8000
# API Docs → http://localhost:8000/docs
```

---

## ⚙️ Run Locally without Docker

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

---

## 🔄 CI/CD Pipeline

Every push to `main` branch:

Push to main
↓
GitHub Actions triggers
↓
✅ Test Backend (Python imports)
✅ Test Frontend (React build)
↓
Both pass?
↓
Auto-deploy to Render + Vercel
↓
MachineSense updated! 🚀

---

## 📊 Key Metrics

| Metric | Value |
|--------|-------|
| Validation Accuracy | 97-100% |
| Minimum training images | ~80 per class |
| API Endpoints | 10+ |
| Frontend Pages | 8 |
| Docker Images | 2 |
| Database Tables | 4 |
| Git Feature Branches | 15+ |

---

## 🏭 How It Works

### Manager Flow (Training)

1. Register company account
2. Upload machine images as ZIP
3. (folder name = machine label)
4. Add descriptions and safety warnings
5. Click "Train" → AI trains automatically
6. Model saved exclusively for your company

### Employee Flow (Identification)

1. Login with credentials from manager
2. Take photo or upload image
3. AI identifies the machine instantly
4. See name, description, safety warnings

---

## 🔒 Security

- JWT tokens with role-based access (Manager/Employee)
- bcrypt password hashing
- Complete multi-tenant data isolation
- All database queries filtered by company_id
- Per-company isolated image storage
- Per-company isolated ML models

---

## 🌍 Multi-Tenancy

Each company gets:
- Private account and workspace
- Isolated image storage (`uploads/{company_id}/`)
- Their own trained AI model (`{company_id}_model.h5`)
- Their own machine database
- No data ever shared between companies

---

## 🚀 Production Deployment

For real factory deployment with full ML capabilities:

```bash
# On a VPS (DigitalOcean, AWS, etc.)
git clone https://github.com/Naseefnf/machinesense.git
cd machinesense
docker-compose up --build -d
```

Recommended: 2GB+ RAM for TensorFlow ML pipeline

---

## 👨‍💻 Author

**Mohammed Naseef**
- GitHub: [@Naseefnf](https://github.com/Naseefnf)

---

## 📄 License

MIT License — feel free to use this project as a reference!

---

*Built with ❤️ to solve a real factory floor problem*
