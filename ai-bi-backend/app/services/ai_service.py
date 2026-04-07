import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"

def generate_ai_response(query, dataset):
    try:
        columns = dataset.get("columns", [])
        preview = dataset.get("preview", [])

        if not preview or len(preview) == 0:
            return "No data available to analyze. Please upload dataset."

        preview_str = json.dumps(preview, indent=2)

        prompt = f"""
You are an expert Business Intelligence AI Analyst.

Analyze the dataset and answer the user's question.

Dataset Columns:
{columns}

Sample Data:
{preview_str}

User Query:
{query}

Instructions:
- Give clear and simple explanation
- Identify trends and patterns
- Provide key insights
- Suggest actionable recommendations
- Use numbers from dataset where possible
- Keep answer structured and professional
"""

        response = requests.post(
            OLLAMA_URL,
            json={
                "model": "phi",
                "prompt": prompt,
                "stream": False
            },
            timeout=180
        )

        if response.status_code != 200:
            print("Ollama Error:", response.text)
            return "AI server error. Please check Ollama."

        result = response.json()

        ai_text = result.get("response", "").strip()

        if not ai_text:
            return "AI returned empty response."

        return ai_text

    except requests.exceptions.ConnectionError:
        return "Cannot connect to AI service. Please run: ollama serve"

    except requests.exceptions.Timeout:
        return "AI response timeout. Try again."

    except Exception as e:
        print("AI Service Error:", str(e))
        return "Unexpected error in AI service"