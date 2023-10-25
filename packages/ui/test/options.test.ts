import { getCodegenOptions, getTailwindcssOptions } from '@/options'

describe('options', () => {
  it('getCodegenOptions snap', () => {
    expect(getCodegenOptions()).toMatchSnapshot()
  })

  it('getTailwindcssOptions snap', () => {
    expect(getTailwindcssOptions()).toMatchSnapshot()
  })
})
