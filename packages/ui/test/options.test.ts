import { getBuildOptions, getTailwindcssOptions } from '@/options'

describe('options', () => {
  it('getBuildOptions snap', () => {
    expect(getBuildOptions()).toMatchSnapshot()
  })

  it('getTailwindcssOptions snap', () => {
    expect(getTailwindcssOptions()).toMatchSnapshot()
  })
})
