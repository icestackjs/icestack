import { consola } from 'consola'

describe('log', () => {
  beforeAll(() => {
    consola.wrapAll()
  })

  beforeEach(() => {
    consola.mockTypes(() => vi.fn())
  })
  it('xx', () => {
    consola.log('your message')
    // @ts-ignore
    const consolaMessages = consola.log.mock.calls.map((c) => c[0])
    expect(consolaMessages).toContain('your message')
  })
})
