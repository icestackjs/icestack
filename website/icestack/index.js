const { addCustomThemes } = require('./add-customs-themes')
const { extendThemes } = require('./extend-themes')
const components = require('./components')
/**
 * @type {import('@icestack/ui').Config}
 */
module.exports = {
  themes: extendThemes(addCustomThemes()),
  components
}
