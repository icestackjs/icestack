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
    const _componentsCss = withOptionsWalkCSSRuleObject({
      ".btn-primary": {
        "--tw-border-opacity": "1",
        "border-color": "rgb(var(--primary) / var(--tw-border-opacity))",
        "--tw-bg-opacity": "1",
        "background-color": "rgb(var(--primary) / var(--tw-bg-opacity))",
        "--tw-text-opacity": "1",
        "color": "rgb(var(--primary-content) / var(--tw-text-opacity))",
        "outline-color": "rgb(var(--primary) / 1)"
      },
      ".btn-success": {
        "--tw-bg-opacity": "1",
        "background-color": "rgb(var(--success) / var(--tw-bg-opacity))"
      },
      ".btn-warning": {
        "--tw-bg-opacity": "1",
        "background-color": "rgb(var(--warning) / var(--tw-bg-opacity))"
      },
      ".btn-error": {
        "--tw-bg-opacity": "1",
        "background-color": "rgb(var(--error) / var(--tw-bg-opacity))"
      }
    }, "components");
    addComponents(_componentsCss);
    const _utilitiesCss = withOptionsWalkCSSRuleObject({}, "utilities");
    addUtilities(_utilitiesCss);
  };
}, function (_options) {
  return {};
});
module.exports = css2TwPlugin;