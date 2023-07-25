module.exports = {
  plugins: [
    require('@pandacss/dev/postcss')(),
    require('@csstools/postcss-cascade-layers')()
  ]
}
