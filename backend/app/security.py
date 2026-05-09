from passlib.context import CryptContext
from jose import jwt
from datetime import timedelta, datetime
from fastapi import Depends, HTTPException
from fastapi.security import  OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

SECRET_KEY = "machinesense-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"])

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str,  hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(company_id: int, role: str = "manager") -> str:
    payload = {
        "company_id": company_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_current_company(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        company_id = payload.get("company_id")
        role = payload.get("role", "employee")
        if company_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"company_id": company_id, "role": role}
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
