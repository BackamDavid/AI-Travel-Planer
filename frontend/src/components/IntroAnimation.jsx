import React from 'react';

const IntroAnimation = ({ onComplete }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
            {/* Simple Centered Content */}
            <div className="relative z-10 text-center space-y-6 animate-fade-in">
                <div className="text-8xl mb-4">
                    🎒
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter">
                    AI TRAVELLER
                </h1>
                <p className="text-gray-400 text-lg font-light tracking-widest uppercase">
                    Your Personalized Journey
                </p>
            </div>
        </div>
    );
};

export default IntroAnimation;
