import path from 'node:path'
import { loadSync } from '@/.'
import ci from 'ci-info'

describe.skipIf(ci.isCI)('load config', () => {
  it('load ts config', () => {
    const config = loadSync({
      cwd: path.resolve(__dirname, 'ts'),
    })
    expect(config?.config.log).toBe(false)
    expect(config.config).toMatchSnapshot()
  })

  it('load js config', () => {
    const config = loadSync({
      cwd: path.resolve(__dirname, 'js'),
    })
    expect(config?.config.log).toBe(false)
    expect(config.config).toMatchSnapshot()
  })
  // For the synchronous API, the only difference is that .mjs files are not included. See "Loading JS modules" for more information.
  // https://www.npmjs.com/package/cosmiconfig?activeTab=readme
  it.skip('load mjs config', () => {
    const config = loadSync({
      cwd: path.resolve(__dirname, 'esm'),
    })
    expect(config?.config.log).toBe(false)
    expect(config.config).toMatchSnapshot()
  })

  it('load cjs config', () => {
    const config = loadSync({
      cwd: path.resolve(__dirname, 'cjs'),
    })
    expect(config?.config.log).toBe(false)
    expect(config.config).toMatchSnapshot()
  })
})
