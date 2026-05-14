from fastapi import FastAPI
from app.database import create_db
from app import models
from app.routers import auth, machines, train, predict, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  
        "http://localhost:3000",  
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "https://machinesense-omega.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(machines.router, prefix="/machines")
app.include_router(train.router, prefix="/train")
app.include_router(predict.router, prefix="/predict")
app.include_router(users.router, prefix="/users")

@app.on_event("startup")
def on_startup():
    create_db()

@app.get("/")
def home():
    return {"message": "Machinesense backend is running"}
