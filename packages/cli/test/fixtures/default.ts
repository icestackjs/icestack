import { defineConfig } from '@icestack/ui'
// install vscode-styled-components for css`` highlight
// https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components
const css = String.raw

export default defineConfig({
  mode: 'none',
  outdir: './my-ui',
  components: {
    // # Hello world sample
    // run `npx icestack build`
    // then see:
    // `my-ui/scss/components/button` - for scss use
    // `my-ui/css/components/button` - for tailwindcss use
    // `my-ui/css-resolved/components/button` - for direct usage
    // `my-ui/cva/button` - for cva component
    // `my-ui/js/components/button` - for tailwindcss/unocss plugin
    button: {
      selector: '.btn',
      schema: ({ selector }) => {
        // selector='.btn'
        return {
          defaults: {
            base: css`
              ${selector} {
                /* @b */
                font-size: 50px;
                padding: 72px 120px;
                border-radius: 20px;
                background: #e5e7eb;
              }
            `,
            styled: css`
              ${selector}-primary {
                /* @v type="primary" */
                background: blue;
                color: white;
              }
              ${selector}-secondary {
                /* @v type="secondary" */
                background: yellow;
              }
              ${selector}-disabled {
                /* @v disabled="true" */
                cursor: not-allowed;
                opacity: 0.15;
              }
            `,
            utils: css`
              ${selector}-lg {
                /* @v size="lg" */
                font-size: 60px;
                padding: 90px 150px;
                border-radius: 30px;
              }
              ${selector}-md {
                /* @v size="md" */
                font-size: 50px;
                padding: 72px 120px;
                border-radius: 20px;
              }
              ${selector}-sm {
                /* @v size="sm" */
                font-size: 40px;
                padding: 60px 100px;
                border-radius: 16px;
              }
              ${selector}-xs {
                /* @v size="xs" */
                font-size: 30px;
                padding: 50px 80px;
                border-radius: 12px;
              }
            `
          }
        }
      }
    }
  }
})
