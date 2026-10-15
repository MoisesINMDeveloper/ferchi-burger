/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F2EDDF',
        cocoa: '#142531',
        caramel: '#EB633D',
        latte: '#D8CDAF',
        rose: '#F08A68',
        brass: '#D4EE4A',
        taupe: '#62796F',
        espresso: '#243A35',
        surface: 'var(--brand-card)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 60px rgba(20, 37, 49, 0.14)',
      },
    },
  },
  plugins: [],
}
