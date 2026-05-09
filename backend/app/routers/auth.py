from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from app.database import get_session
from app.models import Company
from app.schemas import CompanyRegister
from app.security import hash_password, verify_password, create_access_token

router=APIRouter()

@router.post("/register")
def register(data: CompanyRegister, session: Session = Depends(get_session)):
    existing = session.exec(select(Company).where(Company.email == data.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = hash_password(data.password)
    company=Company(
        name=data.company_name,
        email=data.email,
        password_hash=hashed
    )
    session.add(company)
    session.commit()

    return {"message": "Company registered successfully"}


@router.post("/login")
def login(data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    company = session.exec(select(Company).where(Company.email == data.username)).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    if not verify_password(data.password, company.password_hash):
        raise HTTPException(status_code=401, detail="Wrong password")
    token = create_access_token(company.id, role="manager")
    return {
    "access_token": token,
    "token_type": "bearer",
    "role": "manager"
}
