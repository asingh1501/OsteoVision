/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#10213f',
        ink: '#172036',
        lavender: '#eef7fb',
        cyan: '#0f766e',
        magenta: '#be185d',
        violet: '#0f766e',
      },
      boxShadow: {
        soft: '0 10px 28px rgba(15, 23, 42, 0.07)',
      },
    },
  },
  plugins: [],
};
