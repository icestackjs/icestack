import fs from 'node:fs'
import path from 'node:path'
import { deleteAsync } from 'del'
import { fixturesResolve, getCss, withPluginTailwindConfig } from './utils'

describe('tw-plugin', () => {
  it('run plugin', async () => {
    // const dir = path.dirname(require.resolve('css-to-tailwindcss-plugin/package.json'))
    // console.log(dir)

    const cacheDir = fixturesResolve('.cache')
    await deleteAsync([cacheDir])
    withPluginTailwindConfig.plugins.push(
      require('../dist/tailwindcss.cjs')({
        entries: [fixturesResolve('theme-mutiple.css'), fixturesResolve('common.scss')],
        cacheDir,
      }),
    )
    await getCss(withPluginTailwindConfig)

    const dirExisted = fs.existsSync(cacheDir)
    expect(dirExisted).toBe(true)

    const cacheIndexFile = path.resolve(cacheDir, 'index.json')
    const existed = fs.existsSync(cacheIndexFile)
    expect(existed).toBe(true)

    const filenames = fs.readdirSync(cacheDir)
    expect(filenames.length).toBe(3)
  })
})
