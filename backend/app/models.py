from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Company(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Machine(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    company_id: int = Field(foreign_key="company.id")
    label: str
    description: Optional[str]
    safety_warning: Optional[str]

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    company_id: int = Field(foreign_key="company.id")
    name: str
    email: str
    password_hash: str
    role: str

class TrainLog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    company_id: int = Field(foreign_key="company.id")
    accuracy: float
    trained_at: datetime = Field(default_factory=datetime.utcnow)
    model_path: str

