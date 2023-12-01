import { createTailwindcssContent } from '@/content/index'

describe('index', () => {
  it('createTailwindcssContent', () => {
    const raw = createTailwindcssContent().raw
    expect(raw).toMatchSnapshot()
  })
})
