// tailwind.config.js (or .cjs) -- UPDATED COLOR PALETTE

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // NEW: A sophisticated, very dark blue for the main background
        'dark-bg': '#0D1117',
        // NEW: A slightly lighter blue-grey for cards
        'dark-card': '#161B22',
        // NEW: An almost-black for code snippet backgrounds
        'dark-code-bg': '#010409',
        // Accents are fine, but we'll update text for better contrast on blue
        'primary-accent': '#6A11CB', // Purple remains a great accent
        'secondary-accent': '#2575FC', // Vibrant blue for primary actions
        // NEW: Softer, slightly off-white text, easier on the eyes than pure white
        'light-text': '#c9d1d9',
        // NEW: A lighter grey for better readability
        'medium-text': '#8b949e',
      },
    },
  },
  plugins: [],
}