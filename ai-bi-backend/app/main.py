from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload, chart, reports, ai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend running"}

app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(chart.router, prefix="/chart", tags=["Chart"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])
app.include_router(ai.router, prefix="/ai", tags=["AI"])