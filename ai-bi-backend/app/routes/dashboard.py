from fastapi import APIRouter
from app.database.connection import SessionLocal
from app.database.models import Dataset

router = APIRouter()

@router.get("/")
def dashboard():
    db = SessionLocal()

    datasets = db.query(Dataset).all()

    total_files = len(datasets)
    total_rows = sum([d.rows for d in datasets])

    return {
        "total_files": total_files,
        "total_rows": total_rows
    }