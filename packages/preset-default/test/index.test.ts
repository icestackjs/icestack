import { base } from '@/base'
describe('index', () => {
  it('base snap', () => {
    expect(base).toMatchSnapshot()
  })
})
