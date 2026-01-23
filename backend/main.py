from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import requests
import json
import traceback
import re

app = FastAPI(title="AI Travel Planner API (Local LLM via Ollama)")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Models ----------
class TravelRequest(BaseModel):
    destination: str
    days: int = 5
    budget: str = "midrange"  # budget/midrange/luxury
    interests: List[str] = []
    travelers: int = 2

# ---------- Mock destination info ----------
MOCK_DATA = {
    "Paris": {
        "attractions": ["Eiffel Tower", "Louvre Museum", "Notre Dame"],
        "restaurants": ["Le Jules Verne", "Café de Flore"],
        "weather": "Sunny, 22°C"
    },
    "Tokyo": {
        "attractions": ["Shibuya Crossing", "Tokyo Tower", "Senso-ji"],
        "restaurants": ["Sukiyabashi Jiro", "Ichiran Ramen"],
        "weather": "Cloudy, 18°C"
    }
}

@app.get("/")
def home():
    return {"message": "AI Travel Planner API is running (Ollama)!"}


@app.post("/plan")
async def plan_trip(request: TravelRequest):
    try:
        destination_info = await get_destination_data(request.destination)
        itinerary = await generate_itinerary_with_ollama(request, destination_info)
        estimated_cost = calculate_cost(request.days, request.budget, request.travelers)

        return {
            "success": True,
            "destination": request.destination,
            "days": request.days,
            "travelers": request.travelers,
            "itinerary": itinerary,
            "estimated_cost": estimated_cost,
            "destination_info": destination_info
        }

    except Exception as e:
        print(traceback.format_exc())
        return {"success": False, "error": str(e)}


async def get_destination_data(destination: str):
    # Use mock for now
    return MOCK_DATA.get(destination, {
        "attractions": [f"Top sights in {destination}"],
        "restaurants": ["Local cuisine"],
        "weather": "Check local forecast"
    })


def _extract_json_object(text: str) -> dict:
    """
    Tries to reliably extract the first JSON object from model output.
    Handles extra text before/after JSON.
    """
    if not text:
        raise ValueError("Empty model response")

    # First attempt: direct parse
    try:
        return json.loads(text)
    except Exception:
        pass

    # Try to find the first {...} block (including newlines)
    match = re.search(r"\{.*\}", text, flags=re.DOTALL)
    if not match:
        raise ValueError("No JSON object found in model output")

    candidate = match.group(0).strip()

    # Remove trailing garbage after last brace if any
    last = candidate.rfind("}")
    candidate = candidate[: last + 1]

    return json.loads(candidate)


def _ollama_generate(prompt: str) -> str:
    r = requests.post(
        "http://localhost:11434/api/generate",
        headers={"Content-Type": "application/json"},
        json={
            "model": "llama3.1:8b-instruct-q4_K_M",
            "prompt": prompt,
            "stream": False,
            "format": "json",  # helps, but model can still break it sometimes
            "options": {
                "temperature": 0.7,
                "top_p": 0.9,
                "num_predict": 250,
                "num_thread": 4
            }
        },
        timeout=180
    )

    if r.status_code != 200:
        raise Exception(f"Ollama HTTP {r.status_code}: {r.text[:400]}")

    data = r.json()
    return (data.get("response") or "").strip()


async def generate_itinerary_with_ollama(request: TravelRequest, destination_info: dict):
    """
    Generates itinerary day-by-day to reduce repetition and improve structure.
    Returns: { "text": "...", "structured": [...] }
    """

    attractions_list = destination_info.get("attractions", [])
    interests = ", ".join(request.interests) if request.interests else "general sightseeing"

    base_themes = [
        "Iconic Landmarks & City Introduction",
        "Food & Local Markets",
        "Culture, Museums & History",
        "Nature, Parks & Scenic Spots",
        "Neighborhood Walks & Hidden Gems",
        "Shopping & Modern City Life",
        "Nightlife & Entertainment",
        "Day Trip / Nearby Highlights",
        "Relaxation & Wellness",
        "Art, Architecture & Local Stories",
    ]
    themes = [base_themes[i % len(base_themes)] for i in range(request.days)]

    structured_days = []
    used_titles = set()

    for day_num in range(1, request.days + 1):
        day_attractions = attractions_list[(day_num - 1) * 2: (day_num - 1) * 2 + 4]
        if not day_attractions:
            day_attractions = attractions_list[:4]

        prompt = f"""
You are a professional travel planner.

Create ONLY Day {day_num} of the itinerary for {request.destination}.
Theme: {themes[day_num - 1]}

STRICT RULES:
- Output ONLY a JSON object (no markdown, no extra text).
- Exactly 3 activities: Morning, Afternoon, Evening.
- Activity titles must be unique and not repeated from previous days.
- Avoid generic text like "Explore the city". Be concrete.

Trip details:
- Budget: {request.budget}
- Interests: {interests}
- Travelers: {request.travelers}

Suggested attractions today (use some): {", ".join(day_attractions)}

Return JSON EXACTLY in this format:
{{
  "day": {day_num},
  "theme": "{themes[day_num - 1]}",
  "estimated_cost": 150,
  "activities": [
    {{"time":"Morning","title":"Specific activity","description":"Concrete detail","cost":40}},
    {{"time":"Afternoon","title":"Different activity","description":"Different experience","cost":50}},
    {{"time":"Evening","title":"Another unique activity","description":"No repetition allowed","cost":30}}
  ],
  "notes":"Unique local tip"
}}
"""

        raw = _ollama_generate(prompt)

        # Parse JSON (robust)
        try:
            day_obj = _extract_json_object(raw)
        except Exception:
            # One retry with stricter instruction if model misbehaves
            retry_prompt = prompt + "\n\nIMPORTANT: Return ONLY JSON. Do not add any commentary."
            raw2 = _ollama_generate(retry_prompt)
            day_obj = _extract_json_object(raw2)

        # Normalize output
        day_obj["day"] = day_obj.get("day", day_num)
        day_obj["theme"] = day_obj.get("theme", themes[day_num - 1])
        day_obj["estimated_cost"] = day_obj.get("estimated_cost", 150)
        day_obj["notes"] = day_obj.get("notes", "Start early to avoid crowds.")

        acts = day_obj.get("activities", [])
        if not isinstance(acts, list):
            acts = []

        slots = ["Morning", "Afternoon", "Evening"]
        # ensure exactly 3 activities
        while len(acts) < 3:
            acts.append({"time": slots[len(acts)], "title": f"Day {day_num} {slots[len(acts)]} Activity", "description": "Enjoy a local experience.", "cost": 0})
        acts = acts[:3]

        # De-duplicate titles across days
        for i, a in enumerate(acts):
            a["time"] = a.get("time") or slots[i]
            a["description"] = a.get("description") or "Enjoy a local experience."
            a["cost"] = a.get("cost", 0)

            title = (a.get("title") or f"Day {day_num} {slots[i]} Activity").strip()
            key = title.lower()
            if key in used_titles:
                title = f"{themes[day_num - 1]} — {title}"
                key = title.lower()
            used_titles.add(key)
            a["title"] = title

        day_obj["activities"] = acts
        structured_days.append(day_obj)

    overview = f"{request.days}-day trip to {request.destination} for {request.travelers} traveler(s). Budget: {request.budget}. Interests: {interests}."

    return {
        "text": overview,
        "structured": structured_days
    }


def calculate_cost(days: int, budget: str, travelers: int):
    daily_rates = {"budget": 50, "midrange": 150, "luxury": 400}
    daily = daily_rates.get(budget, 150)
    return daily * days * travelers


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
