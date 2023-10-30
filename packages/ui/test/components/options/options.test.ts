import { componentsMap } from '@/components'
import { getCodegenOptions } from '@/options'

describe.each(
  Object.entries(componentsMap).map((x) => {
    return {
      name: x[0],
      value: x[1]
    }
  })
)('$name options', ({ value }) => {
  it('snap', () => {
    expect(
      value.options({
        options: getCodegenOptions(),
        types: []
      })
    ).toMatchSnapshot()
  })
})
