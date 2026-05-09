from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlmodel import Session, select
from app.database import get_session
from app.models import Machine
from app.security import get_current_company
from app.schemas import MachineUpdate
import zipfile
import shutil
import os

router = APIRouter()

@router.post("/upload")
async def upload_images(
    file: UploadFile = File(...),
    current: dict = Depends(get_current_company),
    session: Session = Depends(get_session)
):
    company_id = current["company_id"]
    company_folder = os.path.join("uploads", str(company_id))
    os.makedirs(company_folder, exist_ok=True)
    zip_path = os.path.join(company_folder, "upload.zip")
    with open(zip_path, "wb") as f:
        f.write(await file.read())
    zipfile.ZipFile(zip_path).extractall(company_folder)
    os.remove(zip_path)
    folders = os.listdir(company_folder)
    for folder in folders:
        folder_path = os.path.join(company_folder, folder)
        if os.path.isdir(folder_path): 
            existing = session.exec(
                select(Machine).where(
                    Machine.company_id == company_id,
                    Machine.label == folder
                )
            ).first()
            if not existing:
                machine = Machine(
                    company_id=company_id,
                    label=folder
                )
                session.add(machine)
    session.commit()
    return {"message": "Images uploaded successfully"} 

@router.get("/")
def get_machines(
    current: dict = Depends(get_current_company),
    session: Session = Depends(get_session)
):
    company_id = current["company_id"]
    machines = session.exec(select(Machine).where(Machine.company_id == company_id)).all()
    return machines
    
@router.patch("/{machine_id}")
def update_machine(
    machine_id: int,
    data: MachineUpdate,
    current: dict = Depends(get_current_company),
    session: Session = Depends(get_session)
):
    company_id = current["company_id"]    
    machine = session.exec(select(Machine).where(Machine.id == machine_id, Machine.company_id == company_id)).first()
    if not machine:
        raise HTTPException(status_code=404, detail="Machine not found")
    if data.description is not None:
        machine.description =  data.description
    if data.safety_warning is not None:
        machine.safety_warning = data.safety_warning
    session.add(machine)
    session.commit()
    session.refresh(machine)
    return machine

@router.delete("/{machine_id}")
def delete_machine(
    machine_id: int,
    current: dict = Depends(get_current_company),
    session: Session = Depends(get_session)
):
    company_id = current["company_id"]
    machine = session.exec(select(Machine).where(
        Machine.id == machine_id,
        Machine.company_id == company_id
    )).first()
    
    if not machine:
        raise HTTPException(status_code=404, detail="Machine not found")
    
    # Delete image folder too!
    folder_path = os.path.join("uploads", str(company_id), machine.label)
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)

    # Delete trained model to force retrain
    model_path = os.path.join("trained_models", f"{company_id}_model.h5")
    label_path = os.path.join("trained_models", f"{company_id}_labels.json")

    if os.path.exists(model_path):
        os.remove(model_path)
    if os.path.exists(label_path):
        os.remove(label_path)
    
    session.delete(machine)
    session.commit()
    return {"message": "Machine deleted successfully"}