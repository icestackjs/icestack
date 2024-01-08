import path from 'node:path'
import ci from 'ci-info'
import { load } from '@icestack/config'
describe.skipIf(ci.isCI)('load config', () => {
  it('load ts config', async () => {
    const config = await load({
      cwd: path.resolve(__dirname, 'ts')
    })
    expect(config?.log).toBe(false)
    expect(config).toMatchSnapshot()
  })

  it('load js config', async () => {
    const config = await load({
      cwd: path.resolve(__dirname, 'js')
    })
    expect(config?.log).toBe(false)
    expect(config).toMatchSnapshot()
  })

  it('load mjs config', async () => {
    const config = await load({
      cwd: path.resolve(__dirname, 'esm')
    })
    expect(config?.log).toBe(false)
    expect(config).toMatchSnapshot()
  })

  it('load cjs config', async () => {
    const config = await load({
      cwd: path.resolve(__dirname, 'cjs')
    })
    expect(config?.log).toBe(false)
    expect(config).toMatchSnapshot()
  })
})
