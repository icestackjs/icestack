import { createDefaultTailwindcssExtends } from '@/tailwindcss'

describe('createDefaultTailwindcssExtends', () => {
  it('default', () => {
    expect(createDefaultTailwindcssExtends()).toMatchSnapshot()
  })

  it('custom varPrefix', () => {
    expect(createDefaultTailwindcssExtends({ varPrefix: '--' })).toMatchSnapshot()
  })
})
