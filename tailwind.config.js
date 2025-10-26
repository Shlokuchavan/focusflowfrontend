/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lavender: '#e6e6ff',
                mint: '#e0f2f1',
                peach: '#ffeaea',
                sky: '#e3f2fd',
                blush: '#fce4ec',
                pastel: {
                    pink: '#ffd6d6',
                    purple: '#e6e6ff',
                    green: '#e0f2f1',
                    blue: '#e3f2fd',
                    yellow: '#fff9e6'
                }
            },
            fontFamily: {
                'comfortaa': ['Comfortaa', 'cursive'],
                'nunito': ['Nunito', 'sans-serif']
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
                'grow': 'grow 0.5s ease-out'
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.7 }
                },
                grow: {
                    '0%': { transform: 'scale(0)', opacity: 0 },
                    '100%': { transform: 'scale(1)', opacity: 1 }
                }
            }
        },
    },
    plugins: [],
}