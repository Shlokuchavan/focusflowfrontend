// frontend/src/components/StatsCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './StatsCard.css';

const StatsCard = ({ title, value, icon, gradient, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
            }}
            className="stats-card group cursor-pointer"
        >
            <motion.div
                className={`stats-icon bg-gradient-to-r ${gradient}`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
            >
                {icon}
            </motion.div>
            <motion.h3
                className="stats-value"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.2 }}
            >
                {value}
            </motion.h3>
            <p className="stats-title">{title}</p>

            {/* Animated background effect */}
            <div className="stats-glow"></div>
        </motion.div>
    );
};

export default StatsCard;