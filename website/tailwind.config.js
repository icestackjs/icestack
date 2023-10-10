const iceui = require('@icestack/ui/tailwindcss')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './theme.config.jsx'],
  theme: {},
  plugins: [iceui]
}
