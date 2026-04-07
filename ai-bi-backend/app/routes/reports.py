from fastapi import APIRouter
from fastapi.responses import FileResponse
from app.services.report_service import add_report, get_reports
from app.services.pdf_service import create_pdf
from app.services.ai_service import generate_ai_response
from app.core import state
import pandas as pd
import os

router = APIRouter()

@router.get("/")
def fetch_reports():
    return {"reports": get_reports()}

@router.post("/")
def create_report(data: dict):
    name = data.get("name", "Untitled Report")
    add_report(name)
    return {"message": "Report created"}

@router.get("/download")
def download_report():
    if not state.LATEST_FILE or not os.path.exists(state.LATEST_FILE):
        return {"error": "Please upload data first"}

    try:
        file_path = state.LATEST_FILE

        if file_path.endswith(".csv"):
            df = pd.read_csv(file_path)
        else:
            df = pd.read_excel(file_path)

        dataset = df.to_dict(orient="records")

        report_text = generate_ai_response(
            "Generate a detailed business report with summary, trends, insights, risks and recommendations",
            dataset
        )

        pdf_path = create_pdf(report_text)

        return FileResponse(
            path=pdf_path,
            filename="AI_Report.pdf",
            media_type="application/pdf"
        )

    except Exception as e:
        print("Report Error:", e)
        return {"error": f"Report generation failed: {str(e)}"}