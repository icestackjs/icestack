import { getCodegenOptions, getCliCodegenOptions } from '@/options'

describe('options', () => {
  it('getCodegenOptions snap', () => {
    expect(getCodegenOptions()).toMatchSnapshot()
  })

  it('getCliCodegenOptions snap', () => {
    expect(getCliCodegenOptions()).toMatchSnapshot()
  })

  // it('getTailwindcssOptions snap', () => {
  //   expect(getTailwindcssOptions()).toMatchSnapshot()
  // })
})
