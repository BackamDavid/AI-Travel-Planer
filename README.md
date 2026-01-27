# AI Travel Planner

A premium, AI-powered travel itinerary generator built with **FastAPI** and **React**. This application uses a **Local LLM via Ollama (phi3:mini)** to craft personalized day-by-day travel plans based on your destination, budget, and interests.

##  Features

- **Intelligent Planning**: Generates structured itineraries with morning, afternoon, and evening activities.
- **Cost Estimation**: Provides daily and total budget estimates based on your travel style (Budget, Midrange, Luxury).
- **Responsive Design**: Modern, glassmorphism UI built with Tailwind CSS.
- **Real-time Integration**: Pulls live suggestions and structured data using a local inference engine.

---

##  Getting Started

### 1. Backend Setup (FastAPI)

```bash
cd backend
# Create and activate virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure Ollama
# 1. Install Ollama from ollama.com
# 2. Pull the required model:
ollama pull phi3:mini

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

##  Tech Stack

- **Backend**: Python, FastAPI, Requests, Pydantic, Uvicorn.
- **Frontend**: React, Tailwind CSS, Axios, Lucide React (optional).
- **AI Model**: Local LLM via Ollama (phi3:mini).

##  Troubleshooting

- **CORS Issues**: Ensure the backend `main.py` has your frontend origin in the `allow_origins` list.
- **Ollama Connection**: Ensure Ollama is running (`ollama serve`) and the `phi3:mini` model is pulled before starting the backend.

## Project Previews

<div align="center">
  <img src="frontend/src/assets/a.gif" width="32%" />
  <img src="frontend/src/assets/b.gif" width="32%" />
  <img src="frontend/src/assets/c.gif" width="32%" />
</div>


