const customThemes = require("./themes.js");

/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: "./my-ui",
  base: {
    themes: {
      ...customThemes,
    },
    mediaDarkTheme: "dim",
  },
};

module.exports = config;
