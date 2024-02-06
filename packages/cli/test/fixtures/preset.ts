import { defineConfig } from '@icestack/ui'
// install vscode-styled-components for css`` highlight
// https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components
const css = String.raw

export default defineConfig({
  mode: 'preset',
  outdir: './my-ui'
})
