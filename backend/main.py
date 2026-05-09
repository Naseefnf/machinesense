from fastapi import FastAPI, Depends
from app.database import create_db
from app import models
from app.routers import auth, machines
from app.security import get_current_company
from app.routers import auth, machines, train, predict

app = FastAPI()

app.include_router(train.router, prefix="/train")
app.include_router(auth.router, prefix="/auth")
app.include_router(machines.router, prefix="/machines")
app.include_router(train.router, prefix="/train")
app.include_router(predict.router, prefix="/predict")

@app.on_event("startup")
def on_startup():
    create_db()

@app.get("/")
def home():
    return {"message": "Machinesense backend is running"}

