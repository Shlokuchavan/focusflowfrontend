// frontend/src/pages/Profile.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="profile-container">
            <Navigation />

            <div className="profile-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="profile-card"
                >
                    <div className="profile-header">
                        <h1 className="profile-title">Profile</h1>
                        <p className="profile-subtitle">Your account information and statistics</p>
                    </div>

                    <div className="profile-sections">
                        {/* User Information - No Box */}
                        <div className="profile-section account-section">
                            <h2 className="section-title">Account Information</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Username</span>
                                    <span className="info-value">{user?.username || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Email</span>
                                    <span className="info-value">{user?.email || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Member Since</span>
                                    <span className="info-value">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Overview - With Box */}
                        {/* Stats Overview - With Box */}
                        <div className="profile-section stats-section">
                            <h2 className="section-title">Your Statistics</h2>
                            <div className="stats-overview">
                                {/* Row 1 */}
                                <div className="stat-item">
                                    <div className="stat-content">
                                        <div className="stat-left">
                                            <div className="stat-icon">⭐</div>
                                            <div className="stat-text">
                                                <span className="stat-label">Level</span>
                                            </div>
                                        </div>
                                        <div className="stat-right">
                                            <span className="stat-value">{user?.stats?.level || 1}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-content">
                                        <div className="stat-left">
                                            <div className="stat-icon">🔥</div>
                                            <div className="stat-text">
                                                <span className="stat-label">Current Streak</span>
                                            </div>
                                        </div>
                                        <div className="stat-right">
                                            <span className="stat-value">{user?.stats?.streak || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="stat-item">
                                    <div className="stat-content">
                                        <div className="stat-left">
                                            <div className="stat-icon">🪙</div>
                                            <div className="stat-text">
                                                <span className="stat-label">Total Coins</span>
                                            </div>
                                        </div>
                                        <div className="stat-right">
                                            <span className="stat-value">{user?.stats?.coins || 0}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-content">
                                        <div className="stat-left">
                                            <div className="stat-icon">✅</div>
                                            <div className="stat-text">
                                                <span className="stat-label">Completed Tasks</span>
                                            </div>
                                        </div>
                                        <div className="stat-right">
                                            <span className="stat-value">{user?.stats?.completedTasks || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="stat-item">
                                    <div className="stat-content">
                                        <div className="stat-left">
                                            <div className="stat-icon">📊</div>
                                            <div className="stat-text">
                                                <span className="stat-label">Total Tasks</span>
                                            </div>
                                        </div>
                                        <div className="stat-right">
                                            <span className="stat-value">{user?.stats?.totalTasks || 0}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-content">
                                        <div className="stat-left">
                                            <div className="stat-icon">⚡</div>
                                            <div className="stat-text">
                                                <span className="stat-label">Experience</span>
                                            </div>
                                        </div>
                                        <div className="stat-right">
                                            <span className="stat-value">{user?.stats?.experience || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Garden Information - With Box */}
                        <div className="profile-section garden-section">
                            <h2 className="section-title">Garden Progress</h2>
                            <div className="garden-info">
                                <div className="garden-stats">
                                    <div className="garden-stat">
                                        <span className="garden-stat-label">Current Scene</span>
                                        <span className="garden-stat-value">
                                            {user?.garden?.currentScene || 'Meadow'}
                                        </span>
                                    </div>
                                    <div className="garden-stat">
                                        <span className="garden-stat-label">Plants Growing</span>
                                        <span className="garden-stat-value">
                                            {user?.garden?.plants?.length || 0}
                                        </span>
                                    </div>
                                    <div className="garden-stat">
                                        <span className="garden-stat-label">Unlocked Scenes</span>
                                        <span className="garden-stat-value">
                                            {user?.garden?.unlockedScenes?.length || 1}
                                        </span>
                                    </div>
                                    <div className="garden-stat">
                                        <span className="garden-stat-label">Decorations</span>
                                        <span className="garden-stat-value">
                                            {user?.garden?.decorations?.length || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Summary - With Box */}
                        <div className="profile-section inventory-section">
                            <h2 className="section-title">Inventory Summary</h2>
                            <div className="inventory-info">
                                <div className="inventory-stats">
                                    <div className="inventory-stat">
                                        <span className="inventory-stat-label">Available Seeds</span>
                                        <span className="inventory-stat-value">
                                            {user?.inventory?.seeds?.length || 0}
                                        </span>
                                    </div>
                                    <div className="inventory-stat">
                                        <span className="inventory-stat-label">Inventory Coins</span>
                                        <span className="inventory-stat-value">
                                            {user?.inventory?.coins || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Preferences - No Box */}
                        <div className="profile-section preferences-section">
                            <h2 className="section-title">Preferences</h2>
                            <div className="preferences-info">
                                <div className="preference-item">
                                    <span className="preference-label">Daily Goal</span>
                                    <span className="preference-value">
                                        {user?.preferences?.dailyGoal || 5} tasks
                                    </span>
                                </div>
                                <div className="preference-item">
                                    <span className="preference-label">Notifications</span>
                                    <span className="preference-value">
                                        {user?.preferences?.notifications ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                                <div className="preference-item">
                                    <span className="preference-label">Weather Effects</span>
                                    <span className="preference-value">
                                        {user?.preferences?.weatherEffects ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;