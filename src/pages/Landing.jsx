import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../assets/landing-animation.json';
import { useTheme } from '../contexts/ThemeContext';
import './Landing.css';

const Landing = () => {
    const { theme, toggleTheme, isDark } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);

    // Scroll detection for navigation transparency
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`landing-container ${isDark ? 'dark' : ''}`}>
            {/* Animated Background Elements */}
            <div className="background-sparkles">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className={`hero-sparkle sparkle-${i + 1}`} />
                ))}
            </div>

            {/* Navigation with scroll class */}
            <nav className={`landing-nav ${isDark ? 'dark' : ''} ${isScrolled ? 'scrolled' : ''}`}>
                <div className="landing-nav-container">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="logo-brand"
                    >

                        <span className="brand-text">🌸 FocusFlow</span>
                    </motion.div>

                    <div className="nav-actions">
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle-btn"
                            aria-label="Toggle theme"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>

                        <Link to="/login" className="btn btn-secondary">
                            <span className="btn-icon">👤</span>
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-primary">
                            <span className="btn-icon">🌸</span>
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content"
                    >
                        <div className="hero-badge">
                            <span className="badge-text">🌿 Your Digital Garden Awaits</span>
                        </div>

                        <h1 className="hero-title">
                            Grow Your Focus,
                            <span className="title-gradient">
                                Bloom Your World
                            </span>
                        </h1>

                        <p className="hero-description">
                            Transform your productivity into a beautiful, ever-growing garden.
                            Every completed task plants a flower in your personal paradise.
                            Watch your focus blossom as you build your dream garden, one task at a time.
                        </p>

                        <div className="hero-actions">
                            <Link to="/register" className="btn btn-primary btn-large">
                                <span className="btn-icon">🌷</span>
                                Start Your Garden
                            </Link>
                            <Link to="/login" className="btn btn-secondary btn-large">
                                <span className="btn-icon">👨‍🌾</span>
                                Existing Gardener
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="trust-indicators">
                            <div className="trust-item">
                                <div className="trust-icon">⭐</div>
                                <span>4.9/5 Rating</span>
                            </div>
                            <div className="trust-item">
                                <div className="trust-icon">🌎</div>
                                <span>10k+ Gardeners</span>
                            </div>
                            <div className="trust-item">
                                <div className="trust-icon">🏆</div>
                                <span>Productivity Award 2024</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="hero-animation"
                    >

                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-header"
                    >
                        <h2 className="section-title">
                            How FocusFlow Nurtures Your Productivity
                        </h2>
                        <p className="section-subtitle">
                            A beautiful, gamified approach to building consistent focus habits
                            that actually stick
                        </p>
                    </motion.div>

                    <div className="features-grid">
                        {[
                            {
                                icon: '📝',
                                title: 'Plant Your Tasks',
                                description: 'Add tasks with different difficulty levels - each one is a seed waiting to bloom',
                                color: 'orb-task',
                                features: ['Easy/Medium/Hard tasks', 'Set deadlines', 'Categorize your work']
                            },
                            {
                                icon: '🌱',
                                title: 'Watch Them Grow',
                                description: 'Complete tasks to plant unique flowers and trees that grow in real-time',
                                color: 'orb-garden',
                                features: ['Real-time growth', 'Seasonal flowers', 'Rare plant collection']
                            },
                            {
                                icon: '🎯',
                                title: 'Harvest Rewards',
                                description: 'Build streaks to unlock new garden scenes, decorations, and special plants',
                                color: 'orb-reward',
                                features: ['Daily streaks', 'Achievement badges', 'Garden customization']
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="feature-card glass-card"
                            >
                                <div className={`feature-orb ${feature.color}`}>
                                    <span className="orb-icon">{feature.icon}</span>
                                </div>
                                <h3 className="feature-title">
                                    {feature.title}
                                </h3>
                                <p className="feature-description">
                                    {feature.description}
                                </p>
                                <ul className="feature-list">
                                    {feature.features.map((item, idx) => (
                                        <li key={idx} className="feature-list-item">
                                            <span className="list-icon">🌿</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="cta-content"
                    >
                        <h2 className="cta-title">
                            Ready to Grow Your Focus Garden?
                        </h2>
                        <p className="cta-description">
                            Join thousands of productive gardeners transforming their workflow
                            into a beautiful, rewarding experience
                        </p>
                        <Link to="/register" className="btn btn-primary btn-xlarge">
                            <span className="btn-icon">🌻</span>
                            Start Growing Today - It's Free!
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Landing;