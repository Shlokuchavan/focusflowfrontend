import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useGarden } from '../contexts/GardenContext';
import Navigation from '../components/Navigation';
import TaskList from '../components/TaskList';
import StatsCard from '../components/StatsCard';
import Footer from '../components/Footer';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const { stats, garden, fetchGarden } = useGarden();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeData = async () => {
            await fetchGarden();
            setIsLoading(false);
        };
        initializeData();
    }, []);

    if (isLoading || !user || !stats) {
        return (
            <div className="dashboard-container">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-white">Loading your workspace...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <Navigation />

            <div className="dashboard-content">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-header"
                >
                    <h1 className="dashboard-title">
                        Welcome back, {user.username}!
                    </h1>
                    <p className="dashboard-subtitle">
                        Continue your productivity journey and watch your garden grow.
                    </p>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="stats-grid"
                >
                    <StatsCard
                        title="Current Streak"
                        value={stats.streak}
                        icon="🔥"
                        type="streak"
                    />
                    <StatsCard
                        title="Completed Tasks"
                        value={stats.completedTasks}
                        icon="✅"
                        type="tasks"
                    />
                    <StatsCard
                        title="Total Plants"
                        value={garden?.plants?.length || 0}
                        icon="🌱"
                        type="plants"
                    />
                    <StatsCard
                        title="Coins"
                        value={stats.coins || 0}
                        icon="🪙"
                        type="coins"
                    />
                </motion.div>

                <div className="dashboard-main-grid">
                    {/* Task List */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="task-section"
                    >
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h2 className="card-title">
                                    Your Tasks
                                </h2>
                            </div>
                            <div className="card-content">
                                <TaskList />
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="sidebar-section"
                    >
                        {/* Garden Preview */}
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h2 className="card-title">
                                    Garden Preview
                                </h2>
                            </div>
                            <div className="card-content">
                                <div className="garden-preview-content">
                                    {garden?.plants && garden.plants.length > 0 ? (
                                        <div className="garden-preview-active">
                                            <div className="garden-icon">🌸</div>
                                            <p className="garden-text">
                                                {garden.plants.length} plants growing
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="garden-preview-empty">
                                            <div className="garden-icon">🌱</div>
                                            <p className="garden-text">Complete tasks to grow your garden</p>
                                        </div>
                                    )}
                                </div>
                                <Link
                                    to="/garden"
                                    className="dashboard-btn primary w-full mt-4 text-center block"
                                >
                                    Visit Full Garden
                                </Link>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h2 className="card-title">
                                    Quick Actions
                                </h2>
                            </div>
                            <div className="card-content space-y-3">
                                <button className="quick-action-btn">
                                    🌟 Buy New Seeds
                                </button>
                                <button className="quick-action-btn">
                                    🎨 Customize Garden
                                </button>
                                <button className="quick-action-btn">
                                    📊 View Analytics
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;