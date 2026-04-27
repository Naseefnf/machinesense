from pydantic import BaseModel, EmailStr

class CompanyRegister(BaseModel):
    company_name: str
    email: EmailStr
    password: str

class CompanyLogin(BaseModel):
    email: EmailStr
    password: str