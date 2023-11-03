import { addons } from '@storybook/manager-api';
import iceTheme from './ice-theme';

addons.setConfig({
  theme: iceTheme,
});

// addons.setConfig({
//   sidebar:{

//     collapsedRoots
//   }
// })