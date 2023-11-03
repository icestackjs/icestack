import { createPreset } from '@/sass/functions'
import { getCodegenOptions } from '@/options'
import { calcBase } from '@/base'
describe('createPreset options', () => {
  it.skip('case 0', () => {
    const options = getCodegenOptions()
    const { allTypes } = calcBase(options)
    const res = createPreset({
      options,
      types: allTypes
    })
    expect(res).toMatchSnapshot()
  })

  it('alert case 0', () => {
    const options = getCodegenOptions()
    const { allTypes } = calcBase(options)
    const res = createPreset({
      options,
      types: allTypes
    })
    expect(res.alert).toMatchSnapshot()
  })

  it('alert case 1', () => {
    const options = getCodegenOptions()
    // const { allTypes } = calcBase(options)
    const res = createPreset({
      options,
      types: []
    })
    expect(res.alert).toMatchSnapshot()
  })

  it('alert base case 0', () => {
    const options = getCodegenOptions({
      mode: 'base'
    })
    // const { allTypes } = calcBase(options)
    const res = createPreset({
      options,
      types: []
    })
    expect(res.alert).toMatchSnapshot()
  })

  it('alert raw case 0', () => {
    const options = getCodegenOptions({
      mode: 'raw'
    })
    // const { allTypes } = calcBase(options)
    const res = createPreset({
      options,
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
    // const { allTypes } = calcBase(options)
    const res = createPreset({
      options,
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
    // const { allTypes } = calcBase(options)
    const res = createPreset({
      options,
      types: []
    })
    expect(res.alert).toMatchSnapshot()
  })
})
