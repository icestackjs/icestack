import { resolveTailwindcss, initConfig } from '@/postcss/tailwindcss'
import { getCodegenOptions } from '@/options'
describe('resolveTailwindcss', () => {
  it('css case 0', () => {
    const { css } = resolveTailwindcss({
      css: `.link-primary {
        @apply text-gray-200 [@media(hover:hover)]:hover:text-gray-100;
      }`,
      config: initConfig(),
      options: getCodegenOptions()
    })
    expect(css).toMatchSnapshot()
  })

  it('css case 1', () => {
    const { css } = resolveTailwindcss({
      css: `.link-primary {
        @apply text-gray-200 [@media(hover:hover)]:hover:text-gray-100;
      }`,
      config: initConfig(),
      options: getCodegenOptions({
        global: {
          atMedia: {
            hover: true
          }
        }
      })
    })
    expect(css).toMatchSnapshot()
  })

  it('css case 2', () => {
    const { css } = resolveTailwindcss({
      css: `@media (hover:hover) {
        .link-primary:hover {
            --tw-text-opacity: 1;
            color: rgb(243 244 246 / var(--tw-text-opacity))
        }
    }`,
      config: initConfig(),
      options: getCodegenOptions({
        global: {
          atMedia: {
            hover: true
          }
        }
      })
    })
    expect(css).toMatchSnapshot()
  })

  it('css case 3', () => {
    const { css } = resolveTailwindcss({
      css: `@media (hover:hover) {
        .link-primary:hover {
            --tw-text-opacity: 1;
            color: rgb(243 244 246 / var(--tw-text-opacity))
        }
    }`,
      config: initConfig(),
      options: getCodegenOptions({
        global: {
          atMedia: {
            hover: false
          }
        }
      })
    })
    expect(css).toMatchSnapshot()
  })

  it('css case 4', () => {
    const { css } = resolveTailwindcss({
      css: `
        .link-primary > *{
            --tw-text-opacity: 1;
            color: rgb(243 244 246 / var(--tw-text-opacity))
        }
    `,
      config: initConfig(),
      options: getCodegenOptions({
        global: {
          selector: {
            universal: 'view'
          }
        }
      })
    })
    expect(css).toMatchSnapshot()
  })

  it('css case 4', () => {
    const { css } = resolveTailwindcss({
      css: `
        .link-primary > *{
            --tw-text-opacity: 1;
            color: rgb(243 244 246 / var(--tw-text-opacity))
        }
    `,
      config: initConfig(),
      options: getCodegenOptions({
        global: {
          selector: {}
        }
      })
    })
    expect(css).toMatchSnapshot()
  })
})
