// object.keys顺序 https://www.npmjs.com/package/postcss-load-config
// https://github.com/postcss/postcss-load-config#ordering
module.exports = {
  plugins: {
    '@pandacss/dev/postcss': {},
    '@csstools/postcss-cascade-layers': {}
  }
  // [
  //   require('@pandacss/dev/postcss')(),
  //   require('@csstools/postcss-cascade-layers')()
  // ]
}
