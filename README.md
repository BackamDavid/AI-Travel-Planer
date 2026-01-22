# ✈️ AI Travel Planner

A premium, AI-powered travel itinerary generator built with **FastAPI** and **React**. This application uses OpenAI's GPT-4o-mini to craft personalized day-by-day travel plans based on your destination, budget, and interests.

## ✨ Features

- **Intelligent Planning**: Generates structured itineraries with morning, afternoon, and evening activities.
- **Cost Estimation**: Provides daily and total budget estimates based on your travel style (Budget, Midrange, Luxury).
- **Responsive Design**: Modern, glassmorphism UI built with Tailwind CSS.
- **Real-time Integration**: Pulls live data and suggestions using OpenAI's structured outputs.

---

## 🚀 Getting Started

### 1. Backend Setup (FastAPI)

```bash
cd backend
# Create and activate virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Create a .env file in the backend directory:
# OPENAI_API_KEY=your_key_here
# GOOGLE_PLACES_KEY=your_key_here

# Start the server
python main.py
```
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup (React)

```bash
cd frontend
# Install dependencies
npm install

# Start the development server
npm start
```
The application will be available at `http://localhost:3000`.

---

## 🛠️ Tech Stack

- **Backend**: Python, FastAPI, OpenAI SDK, Pydantic, Uvicorn.
- **Frontend**: React, Tailwind CSS, Axios, Lucide React (optional).
- **AI Model**: GPT-4o-mini (JSON mode).

## 📝 Troubleshooting

- **CORS Issues**: Ensure the backend `main.py` has your frontend origin in the `allow_origins` list.
- **API Key**: If the itinerary generation returns identical "fallback" data, verify that your `OPENAI_API_KEY` in `.env` is valid and the backend has been restarted.
