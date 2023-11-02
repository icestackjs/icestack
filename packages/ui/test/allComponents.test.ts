import allComponents from '@/allComponents'

describe('allComponents exports', () => {
  it('snap', () => {
    expect(allComponents).toMatchSnapshot()
  })
})
