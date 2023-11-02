import 'tailwindcss/tailwind.css'
// import i18n from './i18next';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/html'

const preview: Preview = {
  globals: {
    locale: 'en',
    locales: {
      en: 'English',
      zh: '中文',
    },
  },
  parameters: {
    // i18n,
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-mode',
  }),
];

export default preview
