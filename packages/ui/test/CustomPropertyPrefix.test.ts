import postcss from 'postcss'
import { postcssCustomPropertyPrefixer } from '../scripts/postcssCustomPropertyPrefixer'
import { defaultVarPrefix } from '@/constants'

describe('CustomPropertyPrefix.test', () => {
  it('add Prefix', async () => {
    const { css } = await postcss([
      postcssCustomPropertyPrefixer({
        prefix: defaultVarPrefix.slice(2)
      })
    ])
      .process(
        // @ts-ignore
        `.no-animation {
        --btn-focus-scale: 1;
        --animation-btn: 0;
        --animation-input: 0;
      }
      .tab-border-none {
        --tab-border: 0px;
      }
      .tab-border {
        --tab-border: 1px;
      }
      .tab-border-2 {
        --tab-border: 2px;
      }
      .tab-border-3 {
        --tab-border: 3px;
      }
      .tab-rounded-none {
        --tab-radius: 0;
      }
      .tab-rounded-lg {
        --tab-radius: 0.5rem;
      }
      `,
        {
          from: undefined
        }
      )
      .async()

    expect(css).toMatchSnapshot()
  })

  it('ignore option', async () => {
    const { css } = await postcss([
      postcssCustomPropertyPrefixer({
        prefix: defaultVarPrefix.slice(2),
        ignore: (prop) => {
          if (prop.startsWith('--tw-')) {
            return true
          }
        }
      })
    ])
      .process(
        // @ts-ignore
        `.no-animation {
        --btn-focus-scale: 1;
        --animation-btn: 0;
        --animation-input: 0;
        --tw-a:0;
        --tw-b:1;
      }
      `,
        {
          from: undefined
        }
      )
      .async()

    expect(css).toMatchSnapshot()
  })
})
