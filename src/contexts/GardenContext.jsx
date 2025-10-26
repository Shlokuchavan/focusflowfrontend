import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const GardenContext = createContext();

export const useGarden = () => {
    const context = useContext(GardenContext);
    if (!context) {
        throw new Error('useGarden must be used within a GardenProvider');
    }
    return context;
};

export const GardenProvider = ({ children }) => {
    const [garden, setGarden] = useState(null);
    const [stats, setStats] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, user } = useAuth();

    // API base URL - point to backend on port 5000
    const API_BASE_URL = 'http://localhost:5000';

    const fetchGarden = async () => {
        // Only fetch if user is authenticated
        if (!isAuthenticated) {
            console.log('User not authenticated, skipping garden fetch');
            return;
        }

        try {
            setLoading(true);
            console.log('🌱 Fetching garden data from:', `${API_BASE_URL}/api/garden`);
            const response = await axios.get(`${API_BASE_URL}/api/garden`);
            console.log('✅ Garden data received:', response.data);
            setGarden(response.data.garden);
            setStats(response.data.stats);
            setInventory(response.data.inventory);
        } catch (error) {
            console.error('❌ Error fetching garden:', error);
            console.error('Error details:', error.response?.data);
            // If unauthorized, clear the data
            if (error.response?.status === 401) {
                setGarden(null);
                setStats(null);
                setInventory(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const updateGarden = (newGarden) => {
        setGarden(newGarden);
    };

    const addPlant = (plant) => {
        setGarden(prev => ({
            ...prev,
            plants: [...prev.plants, plant]
        }));
    };

    // ADD THIS FUNCTION - Plant New Flower
    const plantNewFlower = async (species, position) => {
        try {
            console.log('🌱 Planting new flower:', species, 'at position:', position);

            const response = await axios.post(`${API_BASE_URL}/api/garden/plant`, {
                species,
                position
            });

            console.log('✅ Flower planted successfully:', response.data);

            // Update local state immediately
            if (response.data.plant) {
                addPlant(response.data.plant);
            }

            // Refresh the entire garden data to get updated stats
            await fetchGarden();

            return response.data;
        } catch (error) {
            console.error('❌ Error planting flower:', error);
            console.error('Error details:', error.response?.data);

            // If there's no backend endpoint, simulate planting locally
            if (error.response?.status === 404) {
                console.log('🌱 Backend endpoint not found, simulating local planting');
                return simulateLocalPlanting(species, position);
            }
            throw error;
        }
    };

    // Fallback function if backend is not available
    const simulateLocalPlanting = (species, position) => {
        const newPlant = {
            id: Date.now().toString(),
            species: species,
            position: position,
            plantedAt: new Date().toISOString(),
            growthStage: 1
        };

        console.log('🌱 Simulating local planting:', newPlant);

        // Update local state
        addPlant(newPlant);

        // Update stats locally
        setStats(prev => ({
            ...prev,
            coins: (prev?.coins || 0) + 5,
            totalPlants: (prev?.totalPlants || 0) + 1
        }));

        return { plant: newPlant, message: 'Flower planted locally' };
    };

    useEffect(() => {
        fetchGarden();
    }, [isAuthenticated]);

    const value = {
        garden,
        stats,
        inventory,
        loading,
        fetchGarden,
        updateGarden,
        addPlant,
        plantNewFlower // ADD THIS TO THE EXPORTED VALUE
    };

    return (
        <GardenContext.Provider value={value}>
            {children}
        </GardenContext.Provider>
    );
};