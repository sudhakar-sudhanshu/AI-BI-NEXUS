from fastapi import APIRouter, HTTPException
from app.services.ai_service import generate_ai_response
from app.core import state

router = APIRouter()

@router.post("/chat")
def ai_chat(data: dict):
    try:
        query = data.get("query")
        dataset = state.LAST_DATASET

        if not query:
            raise HTTPException(status_code=400, detail="Query is required")

        if not dataset or len(dataset) == 0:
            return {
                "status": "error",
                "answer": "No dataset found. Please upload data first."
            }

        formatted_data = {
            "columns": list(dataset[0].keys()),
            "preview": dataset[:3]
        }

        answer = generate_ai_response(query, formatted_data)

        return {
            "status": "success",
            "answer": answer
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        print("AI ERROR:", str(e))
        return {
            "status": "error",
            "answer": "Something went wrong while generating AI response"
        }