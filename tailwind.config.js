/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brutalist: {
          bg: '#18181b', // yanada chuqur qora
          accent: '#d4ff00',
          border: '#232526',
          card: '#232526',
          error: '#ff006e',
          blue: '#38bdf8',
          pink: '#ff80b5',
          yellow: '#ffe066',
          green: '#4ade80',
          orange: '#ffb347',
          purple: '#a78bfa',
          cyan: '#67e8f9',
          white: '#f8fafc',
          black: '#18181b',
          gradient1: 'linear-gradient(90deg, #d4ff00 0%, #38bdf8 100%)',
          gradient2: 'linear-gradient(90deg, #ff80b5 0%, #ffe066 100%)',
        },
      },
      fontFamily: {
        'space-grotesk': ['SpaceGrotesk-Medium'],
        'archivo-black': ['ArchivoBlack-Regular'],
      },
    },
  },
  plugins: [],
};
