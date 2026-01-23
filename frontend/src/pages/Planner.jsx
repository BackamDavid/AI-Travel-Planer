import React, { useState } from "react";
import axios from "axios";
import TripForm from "../components/TripForm";
import ItineraryView from "../components/ItineraryView";

const Planner = () => {
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePlanSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:8000/plan", formData);
            if (response.data.success) {
                setItinerary(response.data);
            } else {
                setError(response.data.error || "Failed to generate itinerary");
            }
        } catch (err) {
            setError("Backend not reachable. Make sure FastAPI is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background image - Fixed to ensure it covers scrolling content */}
            <div className="fixed inset-0 z-0">
                <img
                    src={`https://source.unsplash.com/1600x900/?travel,map,journey`}
                    alt="Travel Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Main content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-12 text-white">
                {/* Header */}
                <header className="text-center mb-16 animate-fade-in-down">
                    <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Plan Your Adventure
                    </h1>
                    <p className="mt-4 text-lg text-gray-200 chat-bubble">
                        Tell us where you want to go, and we'll handle the rest.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Panel - Control Center */}
                    <div className="lg:col-span-4 h-fit sticky top-24">
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <span>🧳</span> Trip Details
                            </h2>
                            <TripForm onSubmit={handlePlanSubmit} loading={loading} />

                            {error && (
                                <div className="mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm">
                                    ⚠️ {error}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Results */}
                    <div className="lg:col-span-8 space-y-8 min-h-[500px]">
                        {itinerary ? (
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-fade-in space-y-6">
                                <ItineraryView data={itinerary} />
                                <div className="text-center mt-8">
                                    <button
                                        onClick={() => setItinerary(null)}
                                        className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 transition text-sm font-medium"
                                    >
                                        🔁 Plan Another Trip
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl rounded-3xl p-20 border border-white/20 text-center space-y-6 border-dashed">
                                <div className="text-8xl mb-6 animate-pulse opacity-80">🗺️</div>
                                <h3 className="text-3xl font-bold mb-3">Your Itinerary Awaits</h3>
                                <p className="text-gray-300 max-w-md mx-auto">
                                    Enter your destination, interests, and budget to receive a beautifully crafted day-by-day plan.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-20 text-center text-gray-500 text-sm">
                    © 2026 AI Travel Planner • Powered by Local LLM
                </footer>
            </div>
        </div>
    );
};

export default Planner;
