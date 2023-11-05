import { addons } from '@storybook/manager-api';
import { STORIES_EXPAND_ALL } from '@storybook/core-events'
import iceTheme from './ice-theme';

addons.setConfig({
  theme: iceTheme,
});

// addons.setConfig({
//   sidebar: {
//     collapsedRoots: []
//   }
// })
// let hasExpanded = false;
// addons.register('expand', (api) => {
//   if (!hasExpanded) {
//     setTimeout(() => {
//       api.emit(STORIES_EXPAND_ALL)
//     }, 0) 
//     hasExpanded = true;
//   }
// })