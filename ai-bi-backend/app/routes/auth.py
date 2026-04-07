from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login(data: dict):
    return {
        "token": "dummy-token",
        "user": data.get("username")
    }