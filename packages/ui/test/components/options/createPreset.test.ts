import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'
import { calcBase } from '@/base'
describe('createPreset options', () => {
  it.skip('case 0', () => {
    const options = getCodegenOptions()
    const ctx = createContext(options)
    const { types } = calcBase(options)
    const res = ctx.createPreset({
      types
    })
    expect(res).toMatchSnapshot()
  })

  it('alert case 0', () => {
    const options = getCodegenOptions()
    const ctx = createContext(options)
    const { types } = calcBase(options)
    const res = ctx.createPreset({
      types
    })
    expect(res.alert).toMatchSnapshot()
  })

  it('alert case 1', () => {
    const options = getCodegenOptions()
    const ctx = createContext(options)

    // const { allTypes } = calcBase(options)
    const res = ctx.createPreset({
      types: []
    })
    expect(res.alert).toMatchSnapshot()
  })

  it('alert base case 0', () => {
    const ctx = createContext({
      mode: 'base'
    })
    // const { allTypes } = calcBase(options)
    const res = ctx.createPreset({
      types: []
    })
    expect(res.alert).toMatchSnapshot()
  })

  it('alert raw case 0', () => {
    const options = getCodegenOptions({
      mode: 'raw'
    })
    const ctx = createContext(options)
    // const { allTypes } = calcBase(options)
    const res = ctx.createPreset({
      types: []
    })
    expect(res.alert).toMatchSnapshot()
  })

  it('alert raw case 1', () => {
    const options = getCodegenOptions({
      mode: 'raw',
      components: {
        alert: {
          mode: 'styled'
        }
      }
    })
    const ctx = createContext(options)
    // const { allTypes } = calcBase(options)
    const res = ctx.createPreset({
      types: []
    })
    expect(res.alert).toMatchSnapshot()
  })

  it('alert raw override case 0', () => {
    const options = getCodegenOptions({
      // prefix: 'som-',
      mode: 'raw',
      components: {
        alert: {
          extend: {
            base: {
              apply: ['bg-red-800']
            }
          },
          override: {
            base: {
              apply: ['bg-red-900']
            }
          },
          extra: {
            '.ccc': {
              css: {
                color: 'red'
              },
              apply: ['bg-blue-500']
            }
          },
          selector: '.xxx'
        }
      }
    })
    const ctx = createContext(options)
    // const { allTypes } = calcBase(options)
    const res = ctx.createPreset({
      types: []
    })
    expect(res.alert).toMatchSnapshot()
  })

  it('add custom component raw override case 0', () => {
    const options = getCodegenOptions({
      // prefix: 'som-',
      mode: 'raw',
      components: {
        alert: {
          extra: {
            '.my-xxx': {
              css: {
                color: 'red'
              },
              apply: ['bg-blue-500'],
              '&:hover': {
                css: {
                  color: 'blue'
                }
              }
            }
          },
          selector: '.my-xxx'
        }
      }
    })
    const ctx = createContext(options)
    // const { allTypes } = calcBase(options)
    const res = ctx.createPreset({
      types: []
    })
    expect(res.alert).toMatchSnapshot()
  })
})
