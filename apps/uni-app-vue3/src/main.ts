import './shim'

import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  // console.log(XMLHttpRequest)
  // new XMLHttpRequest()
  app.mixin({
    options: {
      virtualHost: true
    }
  })
  return {
    app,
    Pinia
  }
}
