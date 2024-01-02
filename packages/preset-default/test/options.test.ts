import { components } from '@/components'
const types = ['primary', 'success', 'warning', 'error', 'neutral']
describe.each(
  Object.entries(components).map((x) => {
    return {
      name: x[0],
      value: x[1]
    }
  })
)('$name options', ({ name, value }) => {
  it('snap', () => {
    const xx = value?.schema({
      types
    })
    expect(xx).toMatchSnapshot()
  })

  it('raw snap', () => {
    expect(
      value?.schema({
        types: []
      })
    ).toMatchSnapshot()
  })
})
