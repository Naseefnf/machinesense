from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_session
from app.models import User
from app.schemas import EmployeeRegister
from app.security import get_current_company, hash_password, create_access_token, verify_password
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/create-employee")
def create_employee(
    data: EmployeeRegister,
    current: dict = Depends(get_current_company),
    session: Session = Depends(get_session)
):
    # Only managers can create employees
    if current["role"] != "manager":
        raise HTTPException(status_code=403, detail="Only managers can create employees")
    
    company_id = current["company_id"]
    
    # Check if email exists
    existing = session.exec(select(User).where(User.email == data.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create employee
    user = User(
        company_id=company_id,
        name=data.name,
        email=data.email,
        password_hash=hash_password(data.password),
        role="employee"
    )
    session.add(user)
    session.commit()
    return {"message": "Employee created successfully"}

@router.post("/employee-login")
def employee_login(
    data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    user = session.exec(select(User).where(User.email == data.username)).first()
    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")
    if not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Wrong password")
    token = create_access_token(user.company_id, role="employee")
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "employee"
    }