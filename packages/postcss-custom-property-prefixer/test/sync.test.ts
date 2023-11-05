import postcss from 'postcss'
import creator from '@/index'
import { matchCustomPropertyFromValue } from '@/utils'

const defaultVarPrefix = '--ice-'

describe('sync usage', () => {
  it('add Prefix', () => {
    const result = postcss([
      creator({
        prefix: defaultVarPrefix.slice(2)
      })
    ]).process(
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
    //  .sync()

    expect(result.css).toMatchSnapshot()
  })

  it('add Prefix case 0', () => {
    const { css } = postcss([
      creator({
        prefix: defaultVarPrefix.slice(2)
      })
    ]).process(
      // @ts-ignore
      `.a {
          --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1));
          --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));
          --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));
      }
      `,
      {
        from: undefined
      }
    )

    expect(css).toMatchSnapshot()
  })

  it('ignoreValueCustomProperty case 0', () => {
    const { css } = postcss([
      creator({
        prefix: defaultVarPrefix.slice(2),
        ignoreValueCustomProperty(cp) {
          return cp.startsWith('--tw-')
        }
      })
    ]).process(
      `.a {
          --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1));
          --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));
          --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));
      }
      `,
      {
        from: undefined
      }
    )

    expect(css).toMatchSnapshot()
  })

  it('different prefix', () => {
    const { css } = postcss([
      creator({
        prefix: defaultVarPrefix.slice(2),
        ignoreValueCustomProperty(cp) {
          return cp.startsWith('--tw-')
        },
        propPrefix: 'xx-'
      })
    ]).process(
      `.a {
          --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1));
          --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));
          --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));
      }
      `,
      {
        from: undefined
      }
    )

    expect(css).toMatchSnapshot()
  })

  it('prefix function', () => {
    const { css } = postcss([
      creator({
        prefix: (decl, target) => {
          if (target === 'prop' && decl.prop.startsWith('--bg-')) {
            return 'aaa-'
          }
          if (target === 'value' && decl.prop.startsWith('--text-')) {
            return 'bbb-'
          }
          return ''
        }
      })
    ]).process(
      `.a {
          --bg-red: hsl(var(--text-red-100));
          --text-red: hsl(var(--text-red-500));
      }
      `,
      {
        from: undefined
      }
    )

    expect(css).toMatchSnapshot()
  })

  it('ignoreDecl case 0', () => {
    const { css } = postcss([
      creator({
        prefix: defaultVarPrefix.slice(2),
        ignoreValueCustomProperty(cp) {
          return cp.startsWith('--tw-')
        },
        propPrefix: 'xx-',
        ignoreDecl(decl) {
          return decl.prop === '--tab-color' || decl.value.includes('hsl(var(--b1)')
        }
      })
    ]).process(
      `.a {
          --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1));
          --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));
          --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));
      }
      `,
      {
        from: undefined
      }
    )

    expect(css).toMatchSnapshot()
  })

  it('ignoreProp case 0', () => {
    const { css } = postcss([
      creator({
        prefix: defaultVarPrefix.slice(2),
        ignoreValueCustomProperty(cp) {
          return cp.startsWith('--tw-')
        },
        propPrefix: 'xx-',
        ignoreProp(decl) {
          return decl.prop === '--tab-color'
        }
      })
    ]).process(
      `.a {
          --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1));
          --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));
          --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));
      }
      `,
      {
        from: undefined
      }
    )

    expect(css).toMatchSnapshot()
  })

  it('ignoreValue case 0', () => {
    const { css } = postcss([
      creator({
        prefix: defaultVarPrefix.slice(2),
        ignoreValueCustomProperty(cp) {
          return cp.startsWith('--tw-')
        },
        propPrefix: 'xx-',
        ignoreValue(decl) {
          return decl.value.includes('hsl(var(--b3)')
        }
      })
    ]).process(
      `.a {
          --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1));
          --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));
          --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));
      }
      `,
      {
        from: undefined
      }
    )

    expect(css).toMatchSnapshot()
  })

  it('ignoreProp case 1', () => {
    const { css } = postcss([
      creator({
        prefix: defaultVarPrefix.slice(2),
        ignoreProp: (decl) => {
          return decl.prop.startsWith('--tw-')
        }
      })
    ]).process(
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

    expect(css).toMatchSnapshot()
  })
})
