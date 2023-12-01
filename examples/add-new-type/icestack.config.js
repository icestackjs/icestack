/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  base: {
    types: {
      // add type
      secondary: {
        // light theme
        light: {
          secondary: '#faad14',
          'secondary-content': '#ffffff',
          'secondary-hover': '#ffc53d',
          'secondary-active': '#d48806'
        },
        // dark theme
        dark: {
          secondary: '#d89614',
          'secondary-content': '#ffffff',
          'secondary-hover': '#aa7714',
          'secondary-active': '#e8b339'
        }
        // more theme
      }
    }
  }
}

module.exports = config
