// module.exports = (ctx) => {
//   return {
//     plugins: {
//       './custom-postcss-plugin.js': { ctx },
//       tailwindcss: {},
//       autoprefixer: {}
//     }
//   }
// }
module.exports = {
  plugins: {
    // './custom-postcss-plugin.js': {},
    tailwindcss: {},
    '@icestack/postcss': {},
    autoprefixer: {}
  }
}
