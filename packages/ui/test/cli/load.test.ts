import { load } from '@/cli'

describe.skip('load config', () => {
  it('load config', async () => {
    const config = await load(__dirname)
    expect(config).toMatchSnapshot()
  })
})
