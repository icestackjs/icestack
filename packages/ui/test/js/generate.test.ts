import { generateIndexCode } from '@/js/generate'
describe('generate', () => {
  it('case 0', () => {
    expect(generateIndexCode(['global/glass', 'styled/artboard', 'unstyled/button'])).toMatchSnapshot()
  })

  it('case 1', () => {
    expect(generateIndexCode(['global/glass', 'styled/glass', 'unstyled/glass'])).toMatchSnapshot()
  })
})
