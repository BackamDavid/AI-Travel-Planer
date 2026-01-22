from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import openai
import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI(title="AI Travel Planner API")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize APIs
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
GOOGLE_PLACES_KEY = os.getenv("GOOGLE_PLACES_KEY")

class TravelRequest(BaseModel):
    destination: str
    days: int = 5
    budget: str = "midrange"  # budget/midrange/luxury
    interests: List[str] = []
    travelers: int = 2

# Mock data for demo (use real APIs for production)
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
    return {"message": "AI Travel Planner API is running!"}

@app.post("/plan")
async def plan_trip(request: TravelRequest):
    """Generate itinerary using OpenAI + mock APIs"""
    
    try:
        # Step 1: Get destination info (mock or real API)
        destination_info = await get_destination_data(request.destination)
        
        # Step 2: Generate with GPT
        itinerary = await generate_with_gpt(request, destination_info)
        
        # Step 3: Add estimated costs
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
        import traceback
        print(traceback.format_exc())
        return {"success": False, "error": str(e)}

async def get_destination_data(destination: str):
    """Get destination data from APIs"""
    
    # For hackathon: Use mock data or Google Places API
    if destination in MOCK_DATA:
        return MOCK_DATA[destination]
    
    # Real Google Places API call (optional)
    try:
        url = f"https://maps.googleapis.com/maps/api/place/textsearch/json"
        params = {
            "query": f"tourist attractions in {destination}",
            "key": GOOGLE_PLACES_KEY
        }
        response = requests.get(url, params=params)
        data = response.json()
        
        attractions = [place["name"] for place in data.get("results", [])[:5]]
        
        return {
            "attractions": attractions,
            "restaurants": ["Local cuisine"],
            "weather": "Check weather API"
        }
    except:
        # Fallback to mock
        return MOCK_DATA.get("Paris", MOCK_DATA["Paris"])

async def generate_with_gpt(request: TravelRequest, destination_info: dict):
    """Use OpenAI to generate itinerary with Structured Output"""
    
    prompt = f"""
    Create a {request.days}-day travel itinerary for {request.destination}.
    
    Travel Details:
    - Budget: {request.budget}
    - Interests: {', '.join(request.interests) if request.interests else 'general sightseeing'}
    - Travelers: {request.travelers} people
    
    Available Attractions: {', '.join(destination_info.get('attractions', []))}
    """
    
    system_prompt = """
    You are a professional travel planner. You must return your response as a JSON object.
    The JSON structure should be:
    {
      "text": "Brief overview of the trip",
      "structured": [
        {
          "day": 1,
          "theme": "Introduction to the city",
          "estimated_cost": 150,
          "activities": [
            {
              "time": "Morning",
              "title": "Activity Name",
              "description": "Short description",
              "cost": 50
            }
          ],
          "notes": "Optional tip for the day"
        }
      ]
    }
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            response_format={ "type": "json_object" },
            temperature=0.7
        )
        
        content = json.loads(response.choices[0].message.content)
        return content
        
    except Exception as e:
        print(f"Error generating with GPT: {e}")
        # Fallback itinerary
        return {
            "text": f"Enjoy your {request.days}-day trip to {request.destination}!",
            "structured": [
                {
                    "day": i+1,
                    "theme": "Local Exploration",
                    "estimated_cost": 100,
                    "activities": [
                        {"time": "Morning", "title": "Explore local attractions", "description": "Start your day with a walk around the neighborhood."},
                        {"time": "Afternoon", "title": "Try local cuisine", "description": "Visit a highly-rated local restaurant."},
                        {"time": "Evening", "title": "Relax and enjoy", "description": "Wind down and prepare for the next day."}
                    ]
                }
                for i in range(request.days)
            ]
        }

def calculate_cost(days: int, budget: str, travelers: int):
    """Calculate estimated cost"""
    daily_rates = {
        "budget": 50,
        "midrange": 150,
        "luxury": 400
    }
    daily = daily_rates.get(budget, 150)
    return daily * days * travelers

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)