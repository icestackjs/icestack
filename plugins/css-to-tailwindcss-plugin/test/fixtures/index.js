const _plugin = require("tailwindcss/plugin");
const returnSelfNoop = x => x;
const css2TwPlugin = _plugin.withOptions(function (_options = {}) {
  const {
    withOptionsWalkCSSRuleObject = returnSelfNoop
  } = _options;
  return function ({
    addBase: addBase,
    addComponents: addComponents,
    addUtilities: addUtilities,
    theme: theme,
    addVariant: addVariant,
    config: config,
    corePlugins: corePlugins,
    e: e,
    matchComponents: matchComponents,
    matchUtilities: matchUtilities,
    matchVariant: matchVariant
  }) {
    const _baseCss = withOptionsWalkCSSRuleObject({
      "h1": {
        "font-size": theme("fontSize.2xl")
      },
      "h2": {
        "font-size": theme("fontSize.xl")
      }
    }, "base");
    addBase(_baseCss);
    const _componentsCss = withOptionsWalkCSSRuleObject({
      ".card": {
        "background-color": theme("colors.white"),
        "border-radius": theme("borderRadius.lg"),
        "padding": theme("spacing.6"),
        "box-shadow": theme("boxShadow.xl")
      }
    }, "components");
    addComponents(_componentsCss);
    const _utilitiesCss = withOptionsWalkCSSRuleObject({
      ".content-auto": {
        "content-visibility": "\"auto\""
      }
    }, "utilities");
    addUtilities(_utilitiesCss);
  };
}, function (_options) {
  return {};
});
module.exports = css2TwPlugin;