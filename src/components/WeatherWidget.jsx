// frontend/src/components/WeatherWidget.jsx
import React from 'react';
import './WeatherWidget.css';

const WeatherWidget = ({ weather = 'sunny' }) => {
    const weatherIcons = {
        sunny: '☀️',
        rainy: '🌧️',
        cloudy: '☁️',
        snowy: '❄️',
        night: '🌙'
    };

    const weatherLabels = {
        sunny: 'Sunny',
        rainy: 'Rainy',
        cloudy: 'Cloudy',
        snowy: 'Snowy',
        night: 'Night'
    };

    return (
        <div className="weather-widget">
            <span className="weather-icon">{weatherIcons[weather]}</span>
            <span className="weather-label">{weatherLabels[weather]}</span>
        </div>
    );
};

export default WeatherWidget;