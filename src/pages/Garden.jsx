// frontend/src/pages/Garden.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGarden } from '../contexts/GardenContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './Garden.css';

const Garden = () => {
    const { garden, stats, plantNewFlower } = useGarden();
    const [activeScene, setActiveScene] = useState('meadow');
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [isDaytime, setIsDaytime] = useState(true);
    const confirmationRef = useRef(null);

    // Close confirmation when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (confirmationRef.current && !confirmationRef.current.contains(event.target)) {
                setSelectedPlant(null);
            }
        };

        if (selectedPlant) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedPlant]);

    // Simulate day/night cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setIsDaytime(prev => !prev);
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    if (!garden) {
        return (
            <div className="garden-loading">
                <div className="loading-spinner">
                    <div className="spinner-blossom"></div>
                    <p>Growing your garden...</p>
                </div>
            </div>
        );
    }

    const scenes = [
        {
            id: 'meadow',
            name: 'Serene Meadow',
            unlocked: true,
            icon: '🌿',
            description: 'A peaceful meadow with gentle breezes',
            sceneClass: 'meadow-scene'
        },
        {
            id: 'forest',
            name: 'Enchanted Forest',
            unlocked: garden.unlockedScenes.includes('forest'),
            icon: '🌳',
            description: 'Mystical forest with ancient trees',
            sceneClass: 'forest-scene'
        },
        {
            id: 'beach',
            name: 'Crystal Beach',
            unlocked: garden.unlockedScenes.includes('beach'),
            icon: '🏖️',
            description: 'Sandy shores with ocean waves',
            sceneClass: 'beach-scene'
        },
        {
            id: 'mountain',
            name: 'Majestic Peak',
            unlocked: stats.level >= 10,
            icon: '⛰️',
            description: 'Breathtaking mountain views',
            sceneClass: 'mountain-scene'
        },
        {
            id: 'celestial',
            name: 'Starlight Garden',
            unlocked: stats.level >= 15,
            icon: '✨',
            description: 'Cosmic garden under the stars',
            sceneClass: 'celestial-scene'
        }
    ];

    const plantSpecies = [
        { id: 'daisy', name: 'Daisy', emoji: '🌼', rarity: 'common', growthTime: 1 },
        { id: 'sunflower', name: 'Sunflower', emoji: '🌻', rarity: 'common', growthTime: 2 },
        { id: 'rose', name: 'Rose', emoji: '🌹', rarity: 'rare', growthTime: 3 },
        { id: 'lavender', name: 'Lavender', emoji: '🪻', rarity: 'uncommon', growthTime: 2 },
        { id: 'orchid', name: 'Orchid', emoji: '💮', rarity: 'epic', growthTime: 4 },
        { id: 'cherry', name: 'Cherry Blossom', emoji: '🌸', rarity: 'legendary', growthTime: 5 }
    ];

    const handlePlantSelect = (plant) => {
        setSelectedPlant(plant);

        // Auto-close after 3 seconds
        setTimeout(() => {
            setSelectedPlant(null);
        }, 3000);
    };

    const closeConfirmation = () => {
        setSelectedPlant(null);
    };

    const currentScene = scenes.find(s => s.id === activeScene);

    return (
        <div className={`garden-container ${isDaytime ? 'day-theme' : 'night-theme'}`}>
            <Navigation />

            {/* Animated Background Elements */}
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>

            <div className="garden-content">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="garden-header"
                >
                    <h1 className="garden-title">Your Peaceful Garden</h1>
                    <p className="garden-subtitle">
                        Every completed task nurtures your beautiful sanctuary
                    </p>
                    <div className="day-night-indicator">
                        <span className={`time-icon ${isDaytime ? 'sun' : 'moon'}`}>
                            {isDaytime ? '☀️' : '🌙'}
                        </span>
                        <span>{isDaytime ? 'Daytime' : 'Nighttime'}</span>
                    </div>
                </motion.div>

                {/* Scene Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="scene-navigation"
                >
                    <div className="scene-header">
                        <h2>Garden Environments</h2>
                        <p>Unlock new scenes as you progress</p>
                    </div>
                    <div className="scene-grid">
                        {scenes.map((scene, index) => (
                            <motion.div
                                key={scene.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`scene-card ${scene.unlocked ? 'unlocked' : 'locked'} ${activeScene === scene.id ? 'active' : ''}`}
                                onClick={() => scene.unlocked && setActiveScene(scene.id)}
                            >
                                <div className="scene-icon">{scene.icon}</div>
                                <div className="scene-info">
                                    <h3>{scene.name}</h3>
                                    <p>{scene.description}</p>
                                </div>
                                {!scene.unlocked && (
                                    <div className="lock-overlay">
                                        <div className="lock-icon">🔒</div>
                                        <span>Level {scene.id === 'mountain' ? 10 : 15}</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Main Garden Display */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="garden-display-container"
                >
                    <div className={`garden-display ${currentScene?.sceneClass || 'meadow-scene'}`}>
                        {/* Ground Texture */}
                        <div className="ground-texture"></div>

                        {/* Animated Background Elements */}
                        <div className="garden-background-elements">
                            <div className="bg-cloud cloud-1"></div>
                            <div className="bg-cloud cloud-2"></div>
                            <div className="bg-butterfly butterfly-1"></div>
                            <div className="bg-butterfly butterfly-2"></div>
                            {!isDaytime && (
                                <>
                                    <div className="star star-1"></div>
                                    <div className="star star-2"></div>
                                    <div className="star star-3"></div>
                                </>
                            )}
                        </div>

                        {/* Plants */}
                        <AnimatePresence>
                            {garden.plants.map((plant, index) => {
                                const plantInfo = plantSpecies.find(p => p.id === plant.species);
                                return (
                                    <motion.div
                                        key={plant.id}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="garden-plant"
                                        style={{
                                            left: `${plant.position.x}%`,
                                            top: `${plant.position.y}%`,
                                        }}
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: [-1, 1, -1],
                                            transition: { duration: 0.5 }
                                        }}
                                    >
                                        <div className="plant-emoji">{plantInfo?.emoji}</div>
                                        <div className="plant-glow"></div>
                                        <div className="plant-shadow"></div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Empty Garden State */}
                        {garden.plants.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="empty-garden"
                            >
                                <div className="empty-icon">🌱</div>
                                <h3>Your Garden Awaits</h3>
                                <p>Complete tasks to plant your first flowers</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Plant Selection & Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="garden-controls"
                >
                    <div className="plant-selection">
                        <h3>Plant New Flowers</h3>
                        <div className="plant-grid">
                            {plantSpecies.map((plant, index) => (
                                <motion.button
                                    key={plant.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    className={`plant-option ${plant.rarity}`}
                                    onClick={() => handlePlantSelect(plant)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <span className="plant-emoji">{plant.emoji}</span>
                                    <span className="plant-name">{plant.name}</span>
                                    <span className="plant-rarity">{plant.rarity}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Garden Stats */}
                    <div className="garden-stats">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="stat-card"
                        >
                            <div className="stat-icon">🌼</div>
                            <div className="stat-content">
                                <div className="stat-value">{garden.plants.length}</div>
                                <div className="stat-label">Total Plants</div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="stat-card"
                        >
                            <div className="stat-icon">🎯</div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.streak}</div>
                                <div className="stat-label">Day Streak</div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="stat-card"
                        >
                            <div className="stat-icon">🏆</div>
                            <div className="stat-content">
                                <div className="stat-value">{garden.unlockedScenes.length}</div>
                                <div className="stat-label">Scenes Unlocked</div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="stat-card"
                        >
                            <div className="stat-icon">🪙</div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.coins}</div>
                                <div className="stat-label">Growth Coins</div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <Footer />

            {/* Planting Confirmation */}
            <AnimatePresence>
                {selectedPlant && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="planting-confirmation"
                    >
                        <motion.div
                            ref={confirmationRef}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="confirmation-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="confetti"></div>
                            <div className="plant-emoji-large">{selectedPlant.emoji}</div>
                            <h3>Planted {selectedPlant.name}!</h3>
                            <p>Your garden is growing more beautiful</p>
                            <button
                                className="close-confirmation-btn"
                                onClick={closeConfirmation}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Garden;