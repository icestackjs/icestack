// object.keys顺序
module.exports = {
  plugins: [
    require('@pandacss/dev/postcss')(),
    require('@csstools/postcss-cascade-layers')()
  ]
}
