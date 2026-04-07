/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#142019',
        sage: '#4A5F54',
        olive: '#A8B68A',
        bone: '#F7F5F2',
        mist: '#EEF1E8',
        sand: '#EAE2D7',
        clay: '#8A7A68',
      },
      fontFamily: {
        sans: ['"Sora"', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(22, 36, 29, 0.12)',
        card: '0 20px 50px rgba(37, 52, 44, 0.12)',
        glow: '0 24px 90px rgba(74, 95, 84, 0.22)',
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(rgba(74, 95, 84, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 95, 84, 0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
