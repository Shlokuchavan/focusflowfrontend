// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GardenProvider } from './contexts/GardenContext';
import { ThemeProvider } from './contexts/ThemeContext'; // Make sure this is imported
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Garden from './pages/Garden';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile'; // Add this import
// Add this import

// Styles
import '../index.css';
function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <GardenProvider>
                    <Router>
                        <div className="App">
                            <Routes>
                                <Route path="/" element={<Landing />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                } />
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                } />
                                {/* Add these new routes */}
                                <Route path="/profile" element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                } />

                                <Route path="/garden" element={
                                    <ProtectedRoute>
                                        <Garden />
                                    </ProtectedRoute>
                                } />
                                <Route path="/analytics" element={
                                    <ProtectedRoute>
                                        <Analytics />
                                    </ProtectedRoute>
                                } />
                            </Routes>
                        </div>
                    </Router>
                </GardenProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;