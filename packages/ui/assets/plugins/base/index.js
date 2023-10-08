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
      ":root": {
        "--primary-content": "255 255 255",
        "--primary": "25 137 250",
        "--success-content": "255 255 255",
        "--success": "7 193 96",
        "--error-content": "255 255 255",
        "--error": "238 10 36",
        "--warning-content": "255 255 255",
        "--warning": "255 151 106"
      }
    }, "base");
    addBase(_baseCss);
    const _componentsCss = withOptionsWalkCSSRuleObject({}, "components");
    addComponents(_componentsCss);
    const _utilitiesCss = withOptionsWalkCSSRuleObject({}, "utilities");
    addUtilities(_utilitiesCss);
  };
}, function (_options) {
  return {};
});
module.exports = css2TwPlugin;