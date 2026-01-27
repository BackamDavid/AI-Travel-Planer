/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',   // Forest Green
        secondary: '#1565C0', // Sky Blue
        accent: '#81C784',    // Light Green
      }
    },
  },
  plugins: [],
}