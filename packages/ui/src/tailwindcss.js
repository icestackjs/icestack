const fs = require('node:fs')
const path = require('node:path')
const plugin = require('tailwindcss/plugin')
const base = require('../assets/js/base/index.js')
const { colors } = require('./colors.js')

module.exports = plugin.withOptions(
  function () {
    const componentsDir = path.resolve(__dirname, '../assets/js/components')
    const utilitiesDir = path.resolve(__dirname, '../assets/js/utilities')
    const components = fs.readdirSync(componentsDir).map((x) => require(path.resolve(componentsDir, x)))
    const utilities = fs.readdirSync(utilitiesDir).map((x) => require(path.resolve(utilitiesDir, x)))
    return function ({ addBase, addComponents, addUtilities }) {
      addBase([base])
      addComponents(components)
      addUtilities(utilities)
    }
  },
  function () {
    return {
      theme: {
        extend: {
          colors: {
            ...colors
          }
        }
      }
    }
  }
)
