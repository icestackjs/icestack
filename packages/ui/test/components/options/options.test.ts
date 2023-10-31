import { componentsMap } from '@/components'
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
    expect(
      value.options({
        options: opts,
        types: [],
        // @ts-ignore
        selector: opts.components[name]?.selector
      })
    ).toMatchSnapshot()
  })
})
