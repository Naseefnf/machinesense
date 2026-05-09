from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models import TrainLog
from app.security import get_current_company
from app.ml.train import train_model

router = APIRouter()

@router.post("/")
def train(
    current: dict = Depends(get_current_company),
    session: Session = Depends(get_session)
):
    try:
        # Step 1: Run training
        company_id = current["company_id"]
        result = train_model(company_id)

        # Step 2: Save to TrainLog
        log = TrainLog(
            company_id=company_id,
            accuracy=result["accuracy"],
            model_path=result["model_path"]
        )
        session.add(log)
        session.commit()

        # Step 3: Return result
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))