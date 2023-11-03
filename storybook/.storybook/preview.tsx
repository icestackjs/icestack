import 'tailwindcss/tailwind.css'
// import i18n from './i18next';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/html'
import { addons } from '@storybook/preview-api'
// import type { Renderer, ProjectAnnotations } from '@storybook/types';
// import i18n from 'storybook-i18n/preview';
// import { withYourI18nDecorator } from './withYourDecorator';
// import React, { Suspense } from 'react';
// import { I18nextProvider } from 'react-i18next';

// @ts-ignore
// const i18nDecorators = i18n?.decorators || [];

addons.getChannel().on('LOCALE_CHANGED', (newLocale) => {
  console.log(newLocale)
});

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
    },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'Table of Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
  },
  
  // ...i18n,
  // decorators: [...i18nDecorators]
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
