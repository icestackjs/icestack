import postcss from 'postcss'
import creator from '@/index'
import { matchCustomPropertyFromValue } from '@/utils'

const defaultVarPrefix = '--ice-'

describe('postcssCustomPropertyPrefixer', () => {
  it('add Prefix', async () => {
    const { css } = await postcss([
      creator({
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

  it('add Prefix case 0', async () => {
    const { css } = await postcss([
      creator({
        prefix: defaultVarPrefix.slice(2)
      })
    ])
      .process(
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
      .async()

    expect(css).toMatchSnapshot()
  })

  it('ignoreValueCustomProperty case 0', async () => {
    const { css } = await postcss([
      creator({
        prefix: defaultVarPrefix.slice(2),
        ignoreValueCustomProperty(cp) {
          return cp.startsWith('--tw-')
        }
      })
    ])
      .process(
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
      .async()

    expect(css).toMatchSnapshot()
  })

  it('different prefix', async () => {
    const { css } = await postcss([
      creator({
        prefix: defaultVarPrefix.slice(2),
        ignoreValueCustomProperty(cp) {
          return cp.startsWith('--tw-')
        },
        propPrefix: 'xx-'
      })
    ])
      .process(
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
      .async()

    expect(css).toMatchSnapshot()
  })

  it('prefix function', async () => {
    const { css } = await postcss([
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
    ])
      .process(
        `.a {
          --bg-red: hsl(var(--text-red-100));
          --text-red: hsl(var(--text-red-500));
      }
      `,
        {
          from: undefined
        }
      )
      .async()
    expect(css).toMatchSnapshot()
  })

  it('ignoreDecl case 0', async () => {
    const { css } = await postcss([
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
    ])
      .process(
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
      .async()

    expect(css).toMatchSnapshot()
  })

  it('ignoreProp case 0', async () => {
    const { css } = await postcss([
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
    ])
      .process(
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
      .async()

    expect(css).toMatchSnapshot()
  })

  it('ignoreValue case 0', async () => {
    const { css } = await postcss([
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
    ])
      .process(
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
      .async()

    expect(css).toMatchSnapshot()
  })

  it('ignoreProp case 1', async () => {
    const { css } = await postcss([
      creator({
        prefix: defaultVarPrefix.slice(2),
        ignoreProp: (decl) => {
          return decl.prop.startsWith('--tw-')
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

describe('matchCustomPropertyFromValue', () => {
  it('case 0', () => {
    const res = []
    matchCustomPropertyFromValue('hsl(var(--bc) / var(--tw-text-opacity, 1));', (arr, idx) => {
      res.push(arr)
      if (idx === 0) {
        expect(arr[0] === 'var(--bc').toBe(true)
        expect(arr[1] === '--bc').toBe(true)
      } else if (idx === 1) {
        expect(arr[0] === 'var(--tw-text-opacity').toBe(true)
        expect(arr[1] === '--tw-text-opacity').toBe(true)
      }
    })
    expect(res.length).toBe(2)
  })

  it('case 1', () => {
    const res = []
    matchCustomPropertyFromValue('var(--custom-prop,);', (arr, idx) => {
      res.push(arr)
      if (idx === 0) {
        expect(arr[0] === 'var(--custom-prop').toBe(true)
        expect(arr[1] === '--custom-prop').toBe(true)
      }
    })
    expect(res.length).toBe(1)
  })

  it('case 2', () => {
    const res = []
    matchCustomPropertyFromValue('var(--my-background, linear-gradient(transparent, aqua), pink);', (arr, idx) => {
      res.push(arr)
      if (idx === 0) {
        expect(arr[0] === 'var(--my-background').toBe(true)
        expect(arr[1] === '--my-background').toBe(true)
      }
    })
    expect(res.length).toBe(1)
  })

  it('case 3', () => {
    const res = []
    matchCustomPropertyFromValue('var(--custom-prop, var(--default-value));', (arr, idx) => {
      res.push(arr)
      if (idx === 0) {
        expect(arr[0] === 'var(--custom-prop').toBe(true)
        expect(arr[1] === '--custom-prop').toBe(true)
      } else if (idx === 1) {
        expect(arr[0] === 'var(--default-value').toBe(true)
        expect(arr[1] === '--default-value').toBe(true)
      }
    })
    expect(res.length).toBe(2)
  })

  it('case 4', () => {
    const res = []
    matchCustomPropertyFromValue('var(         --custom-prop, var(  --default-value, red));', (arr, idx) => {
      res.push(arr)
      if (idx === 0) {
        expect(arr[0] === 'var(         --custom-prop').toBe(true)
        expect(arr[1] === '--custom-prop').toBe(true)
      } else if (idx === 1) {
        expect(arr[0] === 'var(  --default-value').toBe(true)
        expect(arr[1] === '--default-value').toBe(true)
      }
    })
    expect(res.length).toBe(2)
  })

  it('case 5', () => {
    const res = []
    matchCustomPropertyFromValue('var(  ----custom-prop,);', (arr) => {
      res.push(arr)
    })
    expect(res.length).toBe(0)
  })
})
