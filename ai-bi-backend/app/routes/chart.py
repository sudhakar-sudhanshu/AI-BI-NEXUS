from fastapi import APIRouter
import pandas as pd
import os
from app.core import state

router = APIRouter()

@router.get("/")
def get_chart_data():
    file_path = state.LATEST_FILE

    if not file_path or not os.path.exists(file_path):
        return []

    try:
        if file_path.endswith(".csv"):
            df = pd.read_csv(file_path)
        else:
            df = pd.read_excel(file_path)

        df.columns = [col.lower() for col in df.columns]

        month_col = None
        value_col = None

        for col in df.columns:
            if col in ["month", "date", "day"]:
                month_col = col
            if col in ["sales", "revenue", "amount", "value"]:
                value_col = col

        if not month_col or not value_col:
            return []

        data = df.groupby(month_col)[value_col].sum().reset_index()
        data.columns = ["month", "sales"]

        return data.to_dict(orient="records")

    except Exception as e:
        print("Chart Error:", e)
        return []