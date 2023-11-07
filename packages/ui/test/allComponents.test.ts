import { componentsNames } from '@/components'

describe('allComponents exports', () => {
  it('snap', () => {
    expect(componentsNames).toMatchSnapshot()
  })
})
