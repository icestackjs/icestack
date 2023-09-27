import fs from 'node:fs'
import path from 'node:path'
import { withPluginTailwindConfigPath, getCssByConfigPath } from './utils'
describe('tw-plugin', () => {
  it('run plugin', async () => {
    await getCssByConfigPath(withPluginTailwindConfigPath)
    const cacheDir = path.resolve(__dirname, '../node_modules/.css-to-tailwindcss-plugin')
    const dirExisted = fs.existsSync(cacheDir)
    expect(dirExisted).toBe(true)

    const cacheIndexFile = path.resolve(cacheDir, 'index.json')
    const existed = fs.existsSync(cacheIndexFile)
    expect(existed).toBe(true)

    const filenames = fs.readdirSync(cacheDir)
    expect(filenames.length).toBe(3)
  })
})
