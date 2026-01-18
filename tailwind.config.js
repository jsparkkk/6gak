/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1025px', // ← 여기 바꿈
      xl: '1280px',
    },
  },
  plugins: [],
}
