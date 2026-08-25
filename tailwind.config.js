/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#0b090c",
        charcoal: "#141014",
        crimson: {
          DEFAULT: "#8b1e2d",
          hover: "#6b1421",
          light: "#a82d3f",
        },
        rosegold: {
          DEFAULT: "#e5b8a6",
          dark: "#b88773",
          light: "#f3d8cc",
        },
        champagne: {
          DEFAULT: "#d4af37",
          light: "#f4e4b5",
        },
        ivory: {
          DEFAULT: "#f8f4ef",
          muted: "#eae2d8",
          dark: "#dcd1c4",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Fraunces"', "Georgia", "serif"],
        body: ['"Plus Jakarta Sans"', '"Work Sans"', "system-ui", "sans-serif"],
        label: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      animation: {
        'seal-spin': 'sealspin 25s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        sealspin: {
          to: { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(229,184,166,0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(212,175,55,0.6))' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

