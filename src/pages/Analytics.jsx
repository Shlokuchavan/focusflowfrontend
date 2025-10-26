// frontend/src/pages/Analytics.jsx
import React, { useState, useEffect } from 'react';
import './Analytics.css';
import Footer from '../components/Footer';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios'; // Import axios

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const COLORS = ['var(--chart-color-1)', 'var(--chart-color-2)', 'var(--chart-color-3)', 'var(--chart-color-4)', 'var(--chart-color-5)'];

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            setLoading(true);
            console.log('🔍 Fetching analytics data...');

            // Use axios instead of fetch - it automatically includes the token
            const response = await axios.get('http://localhost:5000/api/analytics');

            console.log('📊 Analytics API Response:', response);
            console.log('📊 Response data:', response.data);

            if (response.data.success) {
                setAnalyticsData(response.data.data);
                console.log('✅ Analytics data loaded successfully');
            } else {
                console.log('❌ Analytics API returned error:', response.data.message);
                setError(response.data.message || 'Failed to fetch analytics data');
            }
        } catch (err) {
            console.error('❌ Analytics fetch error:', err);
            console.error('❌ Error response:', err.response);
            setError(err.response?.data?.message || 'Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };
    // ... rest of your component remains the same


    // Format data for charts from API response
    const formatChartData = () => {
        if (!analyticsData) return null;

        return {
            // Weekly productivity data
            productivityData: analyticsData.weeklyProgress?.map(week => ({
                date: week.week,
                tasks: week.totalTasks,
                completed: week.completedTasks,
                completionRate: week.completionRate
            })) || [],

            // Task categories data
            categoryData: analyticsData.taskCategories?.map(category => ({
                name: category.category,
                value: category.count,
                color: COLORS[category.index % COLORS.length]
            })) || [],

            // Difficulty distribution
            difficultyData: analyticsData.difficultyDistribution?.map(diff => ({
                name: diff.difficulty,
                value: diff.count,
                color: COLORS[diff.index % COLORS.length]
            })) || [],

            // Stats overview
            stats: analyticsData.overview || {}
        };
    };

    const chartData = formatChartData();

    if (loading) {
        return (
            <div className="analytics-container">
                <Navigation />
                <div className="analytics-content">
                    <div className="loading-container">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-pink"></div>
                        <p>Loading your analytics...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="analytics-container">
                <Navigation />
                <div className="analytics-content">
                    <div className="error-container">
                        <div className="error-icon">⚠️</div>
                        <h3>Unable to load analytics</h3>
                        <p>{error}</p>
                        <button
                            onClick={fetchAnalyticsData}
                            className="btn-primary mt-4"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!analyticsData) {
        return (
            <div className="analytics-container">
                <Navigation />
                <div className="analytics-content">
                    <div className="no-data-container">
                        <div className="no-data-icon">📊</div>
                        <h3>No Analytics Data Yet</h3>
                        <p>Complete some tasks to see your productivity analytics</p>
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="btn-primary mt-4"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="analytics-container">
            <Navigation />

            <div className="analytics-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="analytics-header"
                >
                    <h1 className="analytics-title">
                        Your Productivity Analytics
                    </h1>
                    <p className="analytics-subtitle">
                        Track your progress and optimize your workflow
                    </p>
                    <p className="analytics-period">
                        Data updated: {new Date(analyticsData.lastUpdated).toLocaleDateString()}
                    </p>
                </motion.div>

                <div className="charts-grid">
                    {/* Weekly Productivity */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="chart-card"
                    >
                        <h2 className="card-title">
                            Weekly Progress
                        </h2>
                        <div className="chart-container">
                            {chartData.productivityData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={chartData.productivityData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="tasks"
                                            stroke="var(--chart-color-1)"
                                            strokeWidth={3}
                                            name="Total Tasks"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="completed"
                                            stroke="var(--chart-color-2)"
                                            strokeWidth={3}
                                            name="Completed"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="no-chart-data">
                                    <p>No weekly data available</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Task Categories */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="chart-card"
                    >
                        <h2 className="card-title">
                            Task Categories
                        </h2>
                        <div className="chart-container">
                            {chartData.categoryData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={chartData.categoryData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {chartData.categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="no-chart-data">
                                    <p>No category data available</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Difficulty Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card mb-8"
                >
                    <h2 className="card-title">
                        Task Difficulty Distribution
                    </h2>
                    <div className="chart-container">
                        {chartData.difficultyData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData.difficultyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {chartData.difficultyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="no-chart-data">
                                <p>No difficulty data available</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="stats-grid"
                >
                    <div className="stat-card">
                        <div className="stat-icon">📈</div>
                        <div className="stat-value">
                            {chartData.stats.completionRate ? `${chartData.stats.completionRate}%` : 'N/A'}
                        </div>
                        <div className="stat-label">Completion Rate</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-value">
                            {chartData.stats.avgFocusTime || '0h'}
                        </div>
                        <div className="stat-label">Avg. Daily Focus</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🔥</div>
                        <div className="stat-value">
                            {chartData.stats.currentStreak || 0}
                        </div>
                        <div className="stat-label">Current Streak</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🌟</div>
                        <div className="stat-value">
                            {chartData.stats.productivityGrade || 'N/A'}
                        </div>
                        <div className="stat-label">Productivity Grade</div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Analytics;