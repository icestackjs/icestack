import { getCodegenOptions } from '@/options'

describe('options', () => {
  it('getCodegenOptions snap', () => {
    expect(getCodegenOptions()).toMatchSnapshot()
  })

  it('getRawCodegenOptions snap', () => {
    expect(getCodegenOptions({}, true)).toMatchSnapshot()
  })

  // it('getTailwindcssOptions snap', () => {
  //   expect(getTailwindcssOptions()).toMatchSnapshot()
  // })
})
