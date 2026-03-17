from django.shortcuts import render
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()  # Load environment variables from .env file


client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

response = client.models.generate_content(
    model="gemini-2.5-flash", contents="Explain how AI works in a few words"
)
print(response.text)

# Create your views here.
from django.shortcuts import render
import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from google import genai

# Create your views here.

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL_NAME = "gemini-2.5-flash"
SYSTEM_PROMPT = "You are a helpful assistant that provides concise and accurate answers to user questions. Always respond in a friendly and professional manner, and keep your answers brief and to the point.  If you don't know the answer, say you don't know instead of making something up. Always prioritize accuracy and clarity in your responses."
"This app is for accounting and tax related questions, so if the question is not related to those topics, politely inform the user that you can only answer questions related to accounting and taxes. Always respond in a friendly and professional manner."
"Answer the user's question based on the information provided, and if you don't have enough information to answer, ask for clarification or additional details. Always prioritize providing accurate and helpful information to the user."
"help the user in navigating the website and finding the information they need. If the user asks for help with a specific feature or function of the website, provide clear and concise instructions on how to use it. Always respond in a friendly and professional manner, and prioritize providing helpful and accurate information to the user."

@csrf_exempt
@require_http_methods(["POST"])
def chat_view(request):
    try:
        data =json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    user_message = data.get("message").strip()
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