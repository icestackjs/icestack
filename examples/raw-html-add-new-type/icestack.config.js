/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  base: {
    themes: {
      light: {
        types: {
          secondary: {
            secondary: '#faad14',
            'secondary-content': '#ffffff',
            'secondary-hover': '#ffc53d',
            'secondary-active': '#d48806'
          }
        }
      },
      dark: {
        types: {
          secondary: {
            secondary: '#d89614',
            'secondary-content': '#ffffff',
            'secondary-hover': '#aa7714',
            'secondary-active': '#e8b339'
          }
        }
      }
    }
  }
}

module.exports = config
