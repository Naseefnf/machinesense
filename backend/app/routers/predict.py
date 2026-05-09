from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlmodel import Session, select
from app.security import get_current_company
from app.ml.predict import predict_image
from app.database import get_session
from app.models import Machine
import os


router = APIRouter()

@router.post("/")
async def predict(
    file: UploadFile = File(...),
    current: dict = Depends(get_current_company),
    session: Session = Depends(get_session)
):
    company_id = current["company_id"]
    temp_path = f"temp_{company_id}_{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(await file.read())
    try:
        result = predict_image(company_id, temp_path)
        os.remove(temp_path)

        # Fetch description and safety warning from database
        machine = session.exec(
            select(Machine).where(
                Machine.company_id == company_id,
                Machine.label == result["machine"]
            )
        ).first()

        if machine:
            result["description"] = machine.description
            result["safety_warning"] = machine.safety_warning

        return result

    except FileNotFoundError as e:
        os.remove(temp_path)
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        os.remove(temp_path)
        raise HTTPException(status_code=500, detail=str(e))