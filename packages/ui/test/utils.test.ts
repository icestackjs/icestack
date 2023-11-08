import { compressCssSelector } from '@/components/shared'

describe('utils', () => {
  it('compressCssSelector case 0', () => {
    expect(compressCssSelector('h1, h2, h3')).toBe('h1,h2,h3')
    expect(compressCssSelector('>   div')).toBe('>div')
    expect(compressCssSelector('span  div')).toBe('span div')
    expect(compressCssSelector('span  ,div')).toBe('span,div')
  })
})
