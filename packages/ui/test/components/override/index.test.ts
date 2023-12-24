// import { omit } from 'lodash-es'
import { createContext } from '@/context'
import { removeDefaultComponents } from '@/components'
describe('override', () => {
  it('override btn', async () => {
    const components = {
      ...removeDefaultComponents,
      button: {
        override: {
          base: {
            '.btn': {
              apply:
                'rounded-btn inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent text-center transition duration-200 ease-out',
              css: {
                // 'font-size': '0.5rem',
                // 'line-height': '1em'
              },
              [`&-disabled,
                &[disabled],
                &:disabled`]: {
                apply: 'bg-gray-100'
              }
            }
          }
        }
      }
    }
    const ctx = createContext({
      components,
      dryRun: false
    })
    const res = await ctx.buildComponents()
    expect(res.button).toMatchSnapshot()
  })

  it('override btn case 0', async () => {
    const components = {
      ...removeDefaultComponents,
      button: {
        override: {
          base: `.btn{
            @apply rounded-btn inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent text-center transition duration-200 ease-out;

            &-disabled,
                &[disabled],
                &:disabled{
                  @apply bg-gray-100;
                }
          }`
        }
      }
    }
    const ctx = createContext({
      components,
      dryRun: false
    })
    const res = await ctx.buildComponents()
    expect(res.button).toMatchSnapshot()
  })

  it('override btn case 1', async () => {
    const components = {
      ...removeDefaultComponents,
      button: {
        override: {
          base: [
            `.btn{
            @apply rounded-btn inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent text-center transition duration-200 ease-out;

            &-disabled,
                &[disabled],
                &:disabled{
                  @apply bg-gray-100;
                }
          }`
          ]
        }
      }
    }
    const ctx = createContext({
      components,
      dryRun: false
    })
    const res = await ctx.buildComponents()
    expect(res.button).toMatchSnapshot()
  })

  it('override btn case 2', async () => {
    const components = {
      ...removeDefaultComponents,
      button: {
        override: `.btn{
          @apply rounded-btn inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent text-center transition duration-200 ease-out;

          &-disabled,
              &[disabled],
              &:disabled{
                @apply bg-gray-100;
              }
        }`
      }
    }
    const ctx = createContext({
      components,
      dryRun: false
    })
    const res = await ctx.buildComponents()
    expect(res.button).toMatchSnapshot()
  })

  it('override btn case 3', async () => {
    const components = {
      ...removeDefaultComponents,
      button: {
        override: [
          `.btn{
          @apply rounded-btn inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent text-center transition duration-200 ease-out;

          &-disabled,
              &[disabled],
              &:disabled{
                @apply bg-gray-100;
              }
        }`
        ]
      }
    }
    const ctx = createContext({
      components,
      dryRun: false
    })
    const res = await ctx.buildComponents()
    expect(res.button).toMatchSnapshot()
  })
})
