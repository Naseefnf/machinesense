from passlib.context import CryptContext
from jose import jwt
from datetime import timedelta, datetime

SECRET_KEY = "machinesense-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"])

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str,  hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(company_id: int) ->  str:
    payload = {
        "company_id": company_id,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

