import { defaultSelectorMap, injectSchema } from '@/defaults'

describe('defaults', () => {
  it('injectSchema', () => {
    expect(injectSchema(defaultSelectorMap)).toMatchSnapshot()
  })
})
