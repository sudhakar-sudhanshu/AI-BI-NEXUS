from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload, ai, reports, auth, chart, dashboard

app = FastAPI(
    title="AI Business Intelligence API",
    description="Backend for AI BI Platform (Upload, AI, Reports, Dashboard)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(ai.router, prefix="/ai", tags=["AI"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(chart.router, prefix="/chart", tags=["Charts"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

@app.get("/")
def home():
    return {
        "message": "AI BI Backend Running Successfully",
        "features": [
            "File Upload & Processing",
            "AI Insights (Ollama)",
            "Reports & PDF Download",
            "Charts & Visualization",
            "Authentication (JWT)",
            "Dashboard Analytics"
        ]
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.on_event("startup")
def startup_event():
    print("Backend Started Successfully")
    print("API Docs: http://127.0.0.1:8000/docs")

@app.on_event("shutdown")
def shutdown_event():
    print("Backend Stopped")