from fastapi import FastAPI
from app.database import create_db
from app import models
from app.routers import auth


app=FastAPI()
app.include_router(auth.router, prefix="/auth")

@app.on_event("startup")
def on_startup():
    create_db()

@app.get("/")
def home():
    return {"message": "Machinesense backend is running"}