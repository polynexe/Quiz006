import json
import os

from dotenv import load_dotenv
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL_NAME = "gemini-2.5-flash"
SYSTEM_PROMPT = (
    "You are a helpful assistant that provides concise and accurate answers to user questions. "
    "Always respond in a friendly and professional manner, and keep your answers brief and to the point. "
    "If you don't know the answer, say you don't know instead of making something up. "
    "Always prioritize accuracy and clarity in your responses. "
    "This app is for accounting and tax related questions, so if the question is not related to those topics, "
    "politely inform the user that you can only answer questions related to accounting and taxes. "
    "Help the user navigate the website and find the information they need."
)

@csrf_exempt
@require_http_methods(["POST"])
def AIChatbotView(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    user_message = (data.get("message") or "").strip()
    if not user_message:
        return JsonResponse({"error": "Message cannot be empty"}, status=400)
    
    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=user_message,
            config={
                "system_instruction": SYSTEM_PROMPT,
            },
        )
        ai_reply = response.text

    except Exception as e:
        print(f"Error generating response: {e}")
        return JsonResponse({"error": "Failed to generate response"}, status=500)
    
    return JsonResponse({"reply": ai_reply})