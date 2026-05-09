from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.security import get_current_company
from app.ml.predict import predict_image
import shutil
import os

router = APIRouter()

@router.post("/")
async def predict(
    file: UploadFile = File(...),
    company_id: int = Depends(get_current_company)
):
    temp_path = f"temp_{company_id}_{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(await file.read())
    try:
        result = predict_image(company_id, temp_path)
        os.remove(temp_path)
        return result
    except FileNotFoundError as e:
        os.remove(temp_path)
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        os.remove(temp_path)
        raise HTTPException(status_code=500, detail=str(e))
    