/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#b76af9',
          DEFAULT: '#8a2be2',
          dark: '#6d1eb3',
        },
        secondary: {
          light: '#4dd7ff',
          DEFAULT: '#00ccff',
          dark: '#00a3cc',
        },
        dark: {
          lighter: '#191932',
          DEFAULT: '#0a0a1a',
          deeper: '#050510',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(138, 43, 226, 0.3)',
        'glow': '0 0 15px rgba(138, 43, 226, 0.4)',
        'glow-lg': '0 0 25px rgba(138, 43, 226, 0.5)',
        'glow-cyan': '0 0 15px rgba(0, 204, 255, 0.4)',
      },
      animation: {
        'gradient-x': 'gradient-x 10s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};