/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        city: {
          red: '#DC2626',
          darkred: '#991B1B',
          lightred: '#FEF2F2',
          accent: '#EF4444',
          dark: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          card: '#FFFFFF',
          surface: '#F8FAFC',
        }
      }
    },
  },
  plugins: [],
}

