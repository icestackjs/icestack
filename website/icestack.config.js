const { sharedExtraColors, sharedExtraVars } = require('@icestack/ui/defaults')

/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  base: {
    themes: {
      light: {
        selector: ':root'
      },
      dark: {
        selector: '.dark'
      }
    }
  }
}
module.exports = config
