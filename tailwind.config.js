/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#10213f',
        ink: '#172036',
        lavender: '#f3efff',
        cyan: '#21c7df',
        magenta: '#d946ef',
        violet: '#7c3aed',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(34, 28, 74, 0.10)',
      },
    },
  },
  plugins: [],
};
