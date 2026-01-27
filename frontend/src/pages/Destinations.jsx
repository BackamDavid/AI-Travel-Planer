import React, { useState } from 'react';
import axios from 'axios';
import nightlifeBg from '../assets/3.jpg';
import foodBg from '../assets/4.jpeg';
import adventureBg from '../assets/5.jpg';
import cultureBg from '../assets/6.jpg';
import relaxationBg from '../assets/7.jpg';
import natureBg from '../assets/8.jpg';
import shoppingBg from '../assets/9.jpg';

const INTERESTS = [
    { id: 'adventure', label: 'Adventure ', bg: 'from-gray-600 to-gray-800', img: adventureBg },
    { id: 'food', label: 'Food & Dining ', bg: 'from-gray-500 to-gray-700', img: foodBg },
    { id: 'culture', label: 'Culture & History ', bg: 'from-gray-600 to-gray-800', img: cultureBg },
    { id: 'relaxation', label: 'Relaxation ', bg: 'from-gray-500 to-gray-700', img: relaxationBg },
    { id: 'nature', label: 'Nature & Wildlife ', bg: 'from-gray-600 to-gray-800', img: natureBg },
    { id: 'nightlife', label: 'Nightlife & Party ', bg: 'from-gray-700 to-gray-900', img: nightlifeBg },
    { id: 'shopping', label: 'Shopping ', bg: 'from-gray-500 to-gray-700', img: shoppingBg },
    { id: 'budget', label: 'Budget Friendly ', bg: 'from-gray-400 to-gray-600' },
];

const Destinations = () => {
    const [step, setStep] = useState(1);
    const [selectedInterest, setSelectedInterest] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countries, setCountries] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInterestSelect = async (interest) => {
        setSelectedInterest(interest);
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8000/suggest_destinations', { interest: interest.label });
            if (response.data.success) {
                setCountries(response.data.suggestions);
                setStep(2);
            } else {
                setError("Failed to fetch suggestions. Please try again.");
            }
        } catch (err) {
            setError("Cannot connect to server. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleCountrySelect = async (country) => {
        setSelectedCountry(country);
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8000/suggest_districts', {
                country: country.country,
                interest: selectedInterest.label
            });
            if (response.data.success) {
                setDistricts(response.data.suggestions);
                setStep(3);
            } else {
                setError("Failed to fetch districts. Please try again.");
            }
        } catch (err) {
            setError("Cannot connect to server.");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setStep(1);
        setSelectedInterest(null);
        setSelectedCountry(null);
        setCountries([]);
        setDistricts([]);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-6 pb-12 animate-fade-in">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                        <span className="text-white">
                            Find Your Perfect Place
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {step === 1 && "What kind of experience are you looking for?"}
                        {step === 2 && `Top countries for ${selectedInterest?.label}`}
                        {step === 3 && `Best places in ${selectedCountry?.country}`}
                    </p>
                </header>

                {error && (
                    <div className="max-w-md mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center text-red-200">
                        {error}
                        <button onClick={reset} className="ml-4 underline hover:text-white">Try Again</button>
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-400 animate-pulse">Asking our AI travel expert...</p>
                    </div>
                ) : (
                    <>
                        {/* STEP 1: INTERESTS */}
                        {step === 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {INTERESTS.map((interest) => (
                                    <button
                                        key={interest.id}
                                        onClick={() => handleInterestSelect(interest)}
                                        className="group relative overflow-hidden rounded-3xl aspect-square p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-105 active:scale-95"
                                    >
                                        {interest.img ? (
                                            <>
                                                <img
                                                    src={interest.img}
                                                    alt={interest.label}
                                                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${interest.bg} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                                        )}
                                        <div className="absolute inset-0 border border-white/10 rounded-3xl"></div>
                                        <span className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300 block">{interest.label.split(' ').pop()}</span>
                                        <span className="text-xl font-bold relative z-10">{interest.label.replace(/ .*/, '')}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* STEP 2: COUNTRIES */}
                        {step === 2 && (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                    {countries.map((item, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleCountrySelect(item)}
                                            className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all hover:-translate-y-1"
                                        >
                                            <div className="text-5xl mb-4">{item.flag}</div>
                                            <h3 className="text-2xl font-bold mb-2">{item.country}</h3>
                                            <p className="text-gray-400 text-sm">{item.reason}</p>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={reset} className="mx-auto block text-gray-400 hover:text-white transition">
                                    ← Start Over
                                </button>
                            </div>
                        )}

                        {/* STEP 3: DISTRICTS */}
                        {step === 3 && (
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {districts.map((place, idx) => (
                                        <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-purple-500/10 transition-all">
                                            <div className="p-6">
                                                <h3 className="text-2xl font-bold mb-4">{place.name}</h3>
                                                <p className="text-gray-300 leading-relaxed">{place.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center pt-8">
                                    <button
                                        onClick={reset}
                                        className="px-8 py-3 rounded-full bg-black hover:bg-white/10 text-white border border-white/20 font-bold transition-transform hover:scale-105 shadow-xl shadow-white/5"
                                    >
                                        Start New Search 🌍
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Destinations;
