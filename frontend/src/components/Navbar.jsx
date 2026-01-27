import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Destinations', path: '/destinations' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-black/80 backdrop-blur-md py-4 shadow-lg'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 group">
                    <div className="bg-white p-2.5 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg flex items-center justify-center">
                        <span className="text-xl">🎒</span>
                    </div>
                    <span className="text-xl font-bold text-white">
                        AI Traveller
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors duration-300 ${location.pathname === link.path
                                ? 'text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        to="/planner"
                        className="px-5 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg shadow-white/10"
                    >
                        Start Planning
                    </Link>
                </div>

                {/* Mobile Menu Button (Simple implementation) */}
                <button className="md:hidden text-white p-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
