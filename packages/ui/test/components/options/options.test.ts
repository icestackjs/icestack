import { schemaMap as componentsMap, preprocessCssInJs } from '@/components'
import { getCodegenOptions } from '@/options'

describe.each(
  Object.entries(componentsMap).map((x) => {
    return {
      name: x[0],
      value: x[1]
    }
  })
)('$name options', ({ name, value }) => {
  it('snap', () => {
    const opts = getCodegenOptions()
    const xx = value.schema({
      // options: opts,
      types: [],
      // @ts-ignore
      selector: opts.components[name]?.selector
    })
    expect({
      selector: xx.selector,
      defaults: preprocessCssInJs(xx.defaults)
    }).toMatchSnapshot()
  })

  it('raw snap', () => {
    const opts = getCodegenOptions()
    expect(
      value.schema({
        // options: opts,
        types: [],
        // @ts-ignore
        selector: opts.components[name]?.selector
      })
    ).toMatchSnapshot()
  })
})
