import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white">

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://source.unsplash.com/1920x1080/?travel,earth,ocean"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-50 scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-medium tracking-wide mb-4 text-blue-200">
                        ✨ Experience the Future of Travel
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        Discover the World <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            Without the Stress
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Your personal AI travel assistant creates custom, day-by-day itineraries tailored to your budget, interests, and dreams in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Link
                            to="/planner"
                            className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center gap-2"
                        >
                            Start Your Journey 🚀
                        </Link>
                        <button className="px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 text-white font-semibold text-lg transition-all backdrop-blur-sm">
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-6 bg-black relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose AI Traveller?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We combine advanced AI with curated travel data to bring you the most personalized experience possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="🤖"
                            title="Smart AI Planning"
                            desc="Forget generic lists. Get a plan that actually fits your schedule and style."
                        />
                        <FeatureCard
                            icon="💰"
                            title="Budget Optimization"
                            desc="We help you get the most out of every dollar, from luxury stays to hidden gems."
                        />
                        <FeatureCard
                            icon="🌍"
                            title="Global coverage"
                            desc="Whether it’s Tokyo, Paris, or a small village in Italy, we’ve got you covered."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-default">
        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

export default Home;
