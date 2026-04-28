from pydantic import BaseModel, EmailStr
from typing import Optional

class CompanyRegister(BaseModel):
    company_name: str
    email: EmailStr
    password: str

class CompanyLogin(BaseModel):
    email: EmailStr
    password: str

class MachineUpdate(BaseModel):
    description: Optional[str] = None
    safety_warning: Optional[str] = None