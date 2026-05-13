/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#10213f',
        ink: '#172036',
        lavender: '#eef4fa',
        cyan: '#0f766e',
        magenta: '#315a89',
        violet: '#365f91',
      },
      boxShadow: {
        soft: '0 10px 28px rgba(15, 23, 42, 0.07)',
      },
    },
  },
  plugins: [],
};
