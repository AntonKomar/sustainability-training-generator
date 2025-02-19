/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')({ modifiers: ['sm', 'lg'] })],
  corePlugins: {
    preflight: true, // Changed to true to ensure base styles are applied
  },
};
