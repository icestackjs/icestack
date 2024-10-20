import * as Pinia from 'pinia'

import { createSSRApp } from 'vue'
import App from './App.vue'
import './shim'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  // console.log(XMLHttpRequest)
  // new XMLHttpRequest()
  app.mixin({
    options: {
      virtualHost: true,
    },
  })
  return {
    app,
    Pinia,
  }
}
