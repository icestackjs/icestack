const { addCustomThemes } = require('./add-customs-themes')
const components = require('./components')
const { extendThemes } = require('./extend-themes')
/**
 * @type {import('@icestack/ui').Config}
 */
module.exports = {
  themes: extendThemes(addCustomThemes()),
  components,
}
