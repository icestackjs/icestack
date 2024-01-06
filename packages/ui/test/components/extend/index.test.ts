import { CodegenOptions, ComponentsOptions } from '@icestack/types'
import { removeDefaultComponents } from '@/components'
import { createContext } from '@/context'

describe('extend', () => {
  it('extend btn', async () => {
    const components = {
      ...removeDefaultComponents,
      button: {
        extend: {
          base: `
          .btn{
            @apply rounded-btn inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent text-center transition duration-200 ease-out;

            &-disabled,
                &[disabled],
                &:disabled{
                  @apply bg-gray-100;
                }
          }
          `
        }
      }
    }
    const ctx = createContext({
      components,
      dryRun: true
    })
    const res = await ctx.buildComponents()
    expect(res.button).toMatchSnapshot()
  })

  it('extend custom case 0', async () => {
    const components: ComponentsOptions = {
      ...removeDefaultComponents,
      custom: {
        selector: '.custom',
        extend: {
          base: `.custom{
            @apply bg-red-200;
            color: red;
          }`
        },
        schema: ({ selector }) => {
          return {
            selector,
            defaults: {
              base: `
              ${selector}{
                @apply bg-red-300;
                color: blue;
              }`
            }
          }
        }
      }
    }
    const ctx = createContext({
      components,
      dryRun: true
    })
    const res = await ctx.buildComponents()
    expect(res.custom).toMatchSnapshot()
  })

  it('extend custom case 1', async () => {
    const components: ComponentsOptions = {
      ...removeDefaultComponents,
      custom: {
        selector: '.custom',
        extend: {
          base: `.custom{
            @apply bg-red-200;
            color: red;
          }`
        }
      }
    }
    const ctx = createContext({
      components,
      dryRun: true
    })
    const res = await ctx.buildComponents()
    expect(res.custom).toMatchSnapshot()
  })
})
