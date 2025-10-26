// frontend/src/components/Navigation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherWidget from './WeatherWidget';
import './Navigation.css';

const Navigation = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme, isDark } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentWeather, setCurrentWeather] = useState('sunny');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Simulate weather changes
    useEffect(() => {
        const weatherTypes = ['sunny', 'cloudy', 'rainy', 'night'];
        const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        setCurrentWeather(randomWeather);
    }, []);

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/garden', label: 'Garden', icon: '🌸' },
        { path: '/analytics', label: 'Analytics', icon: '📈' }
    ];

    const handleUserMenuToggle = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        setIsUserMenuOpen(false);
    };

    const handleAdminClick = () => {
        navigate('/admin');
        setIsUserMenuOpen(false);
    };

    return (
        <motion.nav
            className={`nav-container ${isScrolled ? 'scrolled' : ''} ${isDark ? 'dark' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="nav-content">
                {/* Logo */}
                <Link to="/dashboard" className="nav-logo">

                    <span className="logo-text"> 🌸FocusFlow</span>
                </Link>

                {/* Navigation Links */}
                <div className="nav-links">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Right Section */}
                <div className="nav-actions">
                    {/* Weather Widget */}
                    <WeatherWidget weather={currentWeather} />

                    {/* Theme Toggle */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Toggle theme"
                    >
                        <div className={`theme-icon ${!isDark ? 'active' : ''}`}>
                            ☀️
                        </div>
                        <div className={`theme-icon ${isDark ? 'active' : ''}`}>
                            🌙
                        </div>
                    </motion.button>

                    {/* User Menu */}
                    {user && (
                        <div className="user-menu-wrapper" ref={userMenuRef}>
                            <button
                                className="user-menu-trigger"
                                onClick={handleUserMenuToggle}
                            >
                                <div className="user-info-compact">
                                    <p className="user-name">{user.username}</p>
                                    <p className="user-level">Level {user.stats?.level || 1}</p>
                                </div>
                                <div className="user-avatar">
                                    {user.username[0].toUpperCase()}
                                </div>
                                <motion.div
                                    animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="dropdown-arrow"
                                >
                                    ▼
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        className="user-dropdown-menu"
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* User Info Section */}
                                        <div className="dropdown-user-info">
                                            <div className="dropdown-avatar">
                                                {user.username[0].toUpperCase()}
                                            </div>
                                            <div className="dropdown-user-details">
                                                <p className="dropdown-username">{user.username}</p>
                                                <p className="dropdown-userlevel">Level {user.stats?.level || 1}</p>
                                                <div className="user-stats-preview">
                                                    <span>🔥 {user.stats?.streak || 0} streak</span>
                                                    <span>🪙 {user.stats?.coins || 0} coins</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="dropdown-divider"></div>

                                        {/* Menu Items */}
                                        <button
                                            className="dropdown-item"
                                            onClick={handleProfileClick}
                                        >
                                            <span className="dropdown-icon">👤</span>
                                            <span>Profile Settings</span>
                                        </button>


                                        <div className="dropdown-divider"></div>

                                        {/* Logout */}
                                        <button
                                            className="dropdown-item logout"
                                            onClick={logout}
                                        >
                                            <span className="dropdown-icon">🚪</span>
                                            <span>Logout</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navigation;