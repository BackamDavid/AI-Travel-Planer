import React, { useState } from 'react';
import axios from 'axios';
import TripForm from './components/TripForm';
import ItineraryView from './components/ItineraryView';

function App() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePlanSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/plan', formData);
      if (response.data.success) {
        setItinerary(response.data);
      } else {
        setError(response.data.error || 'Failed to generate itinerary');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Connection failed. Please ensure the backend server is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            ✈️ AI Travel Planner
          </h1>
          <p className="text-xl text-gray-600">
            Craft your perfect journey with the power of Artificial Intelligence
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel - Control Center */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <TripForm onSubmit={handlePlanSubmit} loading={loading} />

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-red-700 text-sm flex items-center">
                  <span className="mr-2">⚠️</span> {error}
                </p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-xs text-red-500 underline"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* Right Panel - Display Results */}
          <div className="lg:col-span-8">
            {itinerary ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ItineraryView data={itinerary} />
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setItinerary(null)}
                    className="text-gray-500 hover:text-gray-700 flex items-center transition-colors"
                  >
                    <span className="mr-2">↺</span> Plan another adventure
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-gray-200 rounded-3xl bg-white/50 text-center">
                <div className="text-6xl mb-6">🧭</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Explore?</h3>
                <p className="text-gray-500 max-w-md">
                  Tell us where you want to go, and your AI travel assistant will build a customized day-by-day itinerary just for you.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div className="flex items-center"><span className="mr-2">✨</span> Personalized tips</div>
                  <div className="flex items-center"><span className="mr-2">💰</span> Cost estimates</div>
                  <div className="flex items-center"><span className="mr-2">🏛️</span> Top attractions</div>
                  <div className="flex items-center"><span className="mr-2">🍜</span> Local dining</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center text-gray-400 text-sm">
        <p>© 2026 AI Travel Planner • Powered by OpenAI</p>
      </footer>
    </div>
  );
}

export default App;