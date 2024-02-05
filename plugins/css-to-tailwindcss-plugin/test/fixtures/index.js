const _plugin = require("tailwindcss/plugin");
const returnSelfNoop = x => x;
const css2TwPlugin = _plugin.withOptions(function (_options = {}) {
  const {
    withOptionsWalkCSSRuleObject = returnSelfNoop
  } = _options;
  return function ({
    addBase: _addBase,
    addComponents: _addComponents,
    addUtilities: _addUtilities,
    theme: _theme
  }) {
    const _baseCss = withOptionsWalkCSSRuleObject({
      "h1": {
        "font-size": _theme("fontSize.2xl")
      },
      "h2": {
        "font-size": _theme("fontSize.xl")
      }
    }, "base");
    _addBase(_baseCss);
    const _componentsCss = withOptionsWalkCSSRuleObject({
      ".card": {
        "background-color": _theme("colors.white"),
        "border-radius": _theme("borderRadius.lg"),
        "padding": _theme("spacing.6"),
        "box-shadow": _theme("boxShadow.xl")
      }
    }, "components");
    _addComponents(_componentsCss);
    const _utilitiesCss = withOptionsWalkCSSRuleObject({
      ".content-auto": {
        "content-visibility": "\"auto\""
      }
    }, "utilities");
    _addUtilities(_utilitiesCss);
  };
}, function (_options) {
  return {};
});
module.exports = css2TwPlugin;