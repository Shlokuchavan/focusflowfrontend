import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // API base URL - point to backend on port 5000
    const API_BASE_URL = 'http://localhost:5000';

    // Set token in localStorage and state
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            // Set default authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/users/me`);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                email,
                password
            });

            const { token: newToken, user: userData } = response.data;

            setToken(newToken);
            setUser(userData);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (username, email, password) => {
        try {
            console.log('🔐 Registering user via:', `${API_BASE_URL}/api/auth/register`);

            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
                username,
                email,
                password
            });

            const { token: newToken, user: userData } = response.data;

            setToken(newToken);
            setUser(userData);

            return { success: true };
        } catch (error) {
            console.error('❌ Registration error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};