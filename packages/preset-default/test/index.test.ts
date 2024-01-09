import { base } from '@/base'
import preset from '@/index'
describe('index', () => {
  it('base snap', () => {
    expect(base).toMatchSnapshot()
  })

  it('preset snap', () => {
    expect(preset()).toMatchSnapshot()
  })
})
