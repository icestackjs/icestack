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
    const _baseCss = withOptionsWalkCSSRuleObject({}, "base");
    addBase(_baseCss);
    const _componentsCss = withOptionsWalkCSSRuleObject({}, "components");
    addComponents(_componentsCss);
    const _utilitiesCss = withOptionsWalkCSSRuleObject({
      ".mp-reset-button": {
        "padding": "0",
        "background-color": "transparent",
        "font-size": "inherit",
        "line-height": "inherit",
        "color": "inherit",
        "border-width": "0"
      },
      ".mp-reset-button::after": {
        "border": "none"
      }
    }, "utilities");
    addUtilities(_utilitiesCss);
  };
}, function (_options) {
  return {};
});
module.exports = css2TwPlugin;