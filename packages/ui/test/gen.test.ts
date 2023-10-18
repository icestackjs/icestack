import { generateIndexCode } from '@/gen'
describe('gen', () => {
  it('case 0', () => {
    expect(generateIndexCode(['global/glass', 'styled/artboard', 'unstyled/button'])).toMatchSnapshot()
  })

  it('case 1', () => {
    expect(generateIndexCode(['global/glass', 'styled/glass', 'unstyled/glass'])).toMatchSnapshot()
  })
})
