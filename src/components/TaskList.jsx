// frontend/src/components/TaskList.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useGarden } from '../contexts/GardenContext';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        category: 'personal',
        priority: 'medium',
        difficulty: 'medium',
        dueDate: ''
    });

    const { fetchGarden, plantNewFlower } = useGarden();

    // API base URL
    const API_BASE_URL = 'http://localhost:5000';

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            console.log('📋 Fetching tasks from:', `${API_BASE_URL}/api/tasks`);
            const response = await axios.get(`${API_BASE_URL}/api/tasks`);
            console.log('✅ Tasks received:', response.data);
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('❌ Error fetching tasks:', error);
            console.error('Error details:', error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            console.log('📝 Creating task at:', `${API_BASE_URL}/api/tasks`);
            console.log('📦 Task data:', newTask);

            const response = await axios.post(`${API_BASE_URL}/api/tasks`, newTask);
            console.log('✅ Task created:', response.data);

            setTasks([response.data.task, ...tasks]);
            setNewTask({
                title: '',
                description: '',
                category: 'personal',
                priority: 'medium',
                difficulty: 'medium',
                dueDate: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error('❌ Error creating task:', error);
            console.error('Error details:', error.response?.data);
        }
    };
    // In your TaskList component, update the handleCompleteTask function
    const handleCompleteTask = async (taskId) => {
        try {
            console.log('✅ Completing task:', taskId);
            const response = await axios.patch(`${API_BASE_URL}/api/tasks/${taskId}/complete`);

            // Update local state
            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, completed: true } : task
            ));

            // Plant a random flower - USE THE CORRECT FUNCTION NAME
            await plantRandomFlower();

            // Refresh garden data
            fetchGarden();

            // Show success message
            alert(`Task completed! You earned coins and planted a flower!`);
        } catch (error) {
            console.error('❌ Error completing task:', error);
            console.error('Error details:', error.response?.data);
        }
    };

    // Make sure plantRandomFlower uses plantNewFlower
    const plantRandomFlower = async () => {
        try {
            const plantSpecies = [
                { id: 'daisy', name: 'Daisy', emoji: '🌼' },
                { id: 'sunflower', name: 'Sunflower', emoji: '🌻' },
                { id: 'rose', name: 'Rose', emoji: '🌹' },
                { id: 'lavender', name: 'Lavender', emoji: '🪻' },
                { id: 'orchid', name: 'Orchid', emoji: '💮' },
                { id: 'cherry', name: 'Cherry Blossom', emoji: '🌸' }
            ];

            // Select a random plant
            const randomPlant = plantSpecies[Math.floor(Math.random() * plantSpecies.length)];

            // Generate random position
            const randomPosition = {
                x: 20 + Math.random() * 60,
                y: 20 + Math.random() * 60
            };

            console.log('🌱 Planting random flower:', randomPlant.name, 'at position:', randomPosition);

            // Plant the flower - USE plantNewFlower
            await plantNewFlower(randomPlant.id, randomPosition);

            console.log('✅ Flower planted successfully');
        } catch (error) {
            console.error('❌ Error planting flower:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            console.log('🗑️ Deleting task:', taskId);
            await axios.delete(`${API_BASE_URL}/api/tasks/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('❌ Error deleting task:', error);
            console.error('Error details:', error.response?.data);
        }
    };


    // ... rest of your component remains the same ...

    if (loading) {
        return (
            <div className="glass-card p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-16 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 dark:glass-card-dark">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-comfortaa font-semibold text-gray-800 dark:text-white">
                    Your Tasks ({tasks.filter(t => !t.completed).length})
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary dark:btn-primary-dark"
                >
                    + New Task
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleCreateTask}
                        className="task-form dark:task-form-dark"
                    >
                        {/* Task Title */}
                        <input
                            type="text"
                            placeholder="Task title..."
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            className="task-input dark:task-input-dark"
                            required
                        />

                        {/* Description */}
                        <textarea
                            placeholder="Description (optional)"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            className="task-textarea dark:task-textarea-dark"
                            rows="2"
                        />

                        {/* Category and Difficulty */}
                        <div className="form-grid">
                            <select
                                value={newTask.category}
                                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                                className="task-select dark:task-select-dark"
                            >
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                                <option value="health">Health</option>
                                <option value="learning">Learning</option>
                                <option value="other">Other</option>
                            </select>

                            <select
                                value={newTask.difficulty}
                                onChange={(e) => setNewTask({ ...newTask, difficulty: e.target.value })}
                                className="task-select dark:task-select-dark"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="form-buttons">
                            <button
                                type="submit"
                                className="btn-primary"
                            >
                                Create Task
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            <div className="space-y-3">
                <AnimatePresence>
                    {tasks.filter(task => !task.completed).map((task, index) => (
                        <motion.div
                            key={task._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="task-card"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 flex-1">
                                    <button
                                        onClick={() => handleCompleteTask(task._id)}
                                        className="w-6 h-6 border-2 border-gray-300 rounded-full hover:border-pastel-pink transition-colors flex items-center justify-center"
                                    >
                                        <div className="w-3 h-3 bg-pastel-pink rounded-full"></div>
                                    </button>

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                                        {task.description && (
                                            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                                        )}
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className={`px-2 py-1 rounded-full text-xs ${task.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                                task.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {task.difficulty}
                                            </span>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                {task.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDeleteTask(task._id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                >
                                    🗑️
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {tasks.filter(task => !task.completed).length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-gray-500"
                    >
                        <div className="text-6xl mb-4">🌱</div>
                        <p className="text-lg">No tasks yet. Create one to start growing your garden!</p>
                    </motion.div>
                )}
            </div>

            {/* Completed Tasks */}
            {tasks.filter(task => task.completed).length > 0 && (
                <div className="mt-8">
                    <h3 className="font-comfortaa font-semibold text-gray-600 mb-4">
                        Completed ({tasks.filter(task => task.completed).length})
                    </h3>
                    <div className="space-y-2">
                        {tasks.filter(task => task.completed).map(task => (
                            <motion.div
                                key={task._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-3 bg-green-50 rounded-lg border border-green-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                                            ✓
                                        </div>
                                        <span className="text-gray-600 line-through">{task.title}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {new Date(task.completedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;