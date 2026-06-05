/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cricketGreen: {
          light: '#2E7D32',
          DEFAULT: '#1B5E20',
          dark: '#123D15',
        },
        cricketRed: {
          light: '#D32F2F',
          DEFAULT: '#C62828',
          dark: '#B71C1C',
        },
        accentGold: {
          light: '#FFD54F',
          DEFAULT: '#FFC107',
          dark: '#FFA000',
        },
        btext: '#212121',
        bglight: '#F5F5F5',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }
    },
  },
  plugins: [],
}
