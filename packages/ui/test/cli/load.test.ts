import { load } from '@/cli'

describe('load config', () => {
  it('load config', async () => {
    const config = await load(__dirname)
    expect(config).toMatchSnapshot()
  })
})
