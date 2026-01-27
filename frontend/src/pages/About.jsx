import React from 'react';
import travelBg from '../assets/travel.jpg';

const About = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6 relative selection:text-white">

            {/* Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img
                    src={travelBg}
                    alt="Travel Background"
                    className="w-full h-full object-cover opacity-50 animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-6 animate-fade-in-down">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
                        About AI Traveller
                    </h1>
                    <p className="text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
                        Revolutionizing travel planning with the power of local Artificial Intelligence.
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-14 space-y-12 animate-fade-in-up shadow-2xl">

                    {/* Mission */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold text-white tracking-wide">Our Mission</h2>
                        </div>
                        <p className="text-lg text-white/90 leading-loose font-light">
                            AI Traveller was born from a simple idea: travel planning should be as exciting as the trip itself.
                            By leveraging advanced Large Language Models (LLMs), we eliminate the hours of research typically needed to build an itinerary.
                            We provide personalized, day-by-day plans that adapt to your budget, interests, and style—all powered by local AI for privacy and speed.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                    {/* How It Works */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-3xl font-bold text-white tracking-wide">How It Works</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { title: "1. You Share", desc: "Tell us your destination, budget, number of travelers, and interests (e.g., Food, History)." },
                                { title: "2. AI Analyzes", desc: "Our local LLM engine processes your request against vast travel knowledge bases." },
                                { title: "3. Plan Generated", desc: "A structured day-by-day itinerary is created, complete with time slots and cost estimates." },
                                { title: "4. Instant PDF Export", desc: "Download your itinerary as a beautiful, clean PDF guide to take with you offline." }
                            ].map((item, idx) => (
                                <div key={idx} className="group bg-white/5 hover:bg-white/10 p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                                    <h3 className={`text-xl font-bold ${item.color} mb-3`}>{item.title}</h3>
                                    <p className="text-white text-base leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>


                </div>

                {/* Developer Section */}
                <div className="flex justify-center animate-fade-in-up delay-300">
                    <div className="group px-8 py-5 bg-black/60 backdrop-blur-xl rounded-full flex items-center space-x-4 border border-white/20 hover:border-white/40 transition-all hover:scale-105 shadow-xl">
                        <span className="text-white/80 text-sm font-medium tracking-widest uppercase">Created & Developed by</span>
                        <span className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-white font-mono">
                                David Backam
                            </span>
                        </span>
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="text-center pb-8 opacity-90 hover:opacity-100 transition-opacity">
                    <p className="text-3xl font-serif italic text-white leading-normal drop-shadow-sm">
                        "The world is a book and those who do not travel read only one page."
                    </p>
                    <p className="text-white/80 mt-4 text-lg tracking-wider">— Augustine of Hippo</p>
                </div>

            </div>
        </div>
    );
};

export default About;
