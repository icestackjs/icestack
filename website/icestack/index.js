const { addCustomThemes } = require('./add-customs-themes')
const { extendThemes } = require('./extend-themes')

module.exports = {
  themes: extendThemes(addCustomThemes())
}
