const color = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      primary: 'rgb(var(--primary) / <alpha-value>)',
      success: 'rgb(var(--success) / <alpha-value>)',
      error: 'rgb(var(--error) / <alpha-value>)',
      warning: 'rgb(var(--warning) / <alpha-value>)',
      'primary-content': 'rgb(var(--primary-color) / <alpha-value>)'
    }
  },
  plugins: [require('ice-mobile-ui')({})],
  corePlugins: {
    preflight: false
  }
}
