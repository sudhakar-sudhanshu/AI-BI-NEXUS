import pandas as pd
import os
from app.database.connection import SessionLocal
from app.database.models import Dataset

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def process_and_store(file):
    path = os.path.join(UPLOAD_DIR, file.filename)

    with open(path, "wb") as f:
        f.write(file.file.read())

    df = pd.read_csv(path)

    db = SessionLocal()

    dataset = Dataset(name=file.filename, rows=len(df))
    db.add(dataset)
    db.commit()

    return df.head(10).to_dict(orient="records"), len(df)