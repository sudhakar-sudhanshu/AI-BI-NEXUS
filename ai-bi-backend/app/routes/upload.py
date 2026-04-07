from fastapi import APIRouter, UploadFile, File
import pandas as pd
import os
from app.core import state

router = APIRouter()

@router.post("/")
async def upload(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)

    path = f"uploads/{file.filename}"

    with open(path, "wb") as f:
        f.write(await file.read())

    if file.filename.endswith(".csv"):
        df = pd.read_csv(path)
    else:
        df = pd.read_excel(path)

    preview = df.head(20).to_dict(orient="records")

    state.LAST_DATASET = df.to_dict(orient="records")
    state.LATEST_FILE = path

    return {
        "preview": preview,
        "columns": list(df.columns),
        "rows": len(df)
    }