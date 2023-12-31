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
              '.xxx': {
                apply: ['bg-red-800']
              },
              '.ccc': {
                css: {
                  color: 'red'
                },
                apply: ['bg-blue-500']
              }
            }
          },
          override: {
            base: {
              '.xxx': {
                apply: ['bg-red-900']
              }
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
          extend: {
            utils: {
              '.alert': {
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
