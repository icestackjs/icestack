import { names } from '@/components'

describe('allComponents exports', () => {
  it('snap', () => {
    expect(names).toMatchSnapshot()
  })
})
