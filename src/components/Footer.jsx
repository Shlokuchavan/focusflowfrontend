// frontend/src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-logo">🌸 FocusFlow</h3>
                    <p className="footer-description">
                        Your personal productivity companion. Grow your garden, complete tasks, and achieve your goals.
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Quick Links</h4>
                    <div className="footer-links">
                        <a href="/dashboard" className="footer-link">Dashboard</a>
                        <a href="/dashboard" className="footer-link">Tasks</a>
                        <a href="/garden" className="footer-link">Garden</a>
                        <a href="/analytics" className="footer-link">Analytics</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Connect</h4>
                    <div className="footer-links">
                        <a href="#" className="footer-link">GitHub</a>
                        <a href="#" className="footer-link">Twitter</a>
                        <a href="#" className="footer-link">Discord</a>
                        <a href="#" className="footer-link">Feedback</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 FocusFlow. Made with ❤️ from Shlok Chavan.</p>
            </div>
        </motion.footer>
    );
};

export default Footer;