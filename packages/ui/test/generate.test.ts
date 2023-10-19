import path from 'node:path'
import fs from 'node:fs'
import { buildAll } from '@/generate'
function resolve(...p: string[]) {
  return path.resolve(__dirname, './fixtures/generate', ...p)
}
describe('generate', () => {
  it('case 0', async () => {
    const dir = resolve('case0')
    await buildAll(dir)
    expect(fs.existsSync(path.resolve(dir, 'css'))).toBe(true)
    expect(fs.existsSync(path.resolve(dir, 'css-resolved'))).toBe(true)
    expect(fs.existsSync(path.resolve(dir, 'js'))).toBe(true)
    expect(fs.existsSync(path.resolve(dir, 'js/base'))).toBe(true)
    expect(fs.existsSync(path.resolve(dir, 'js/components'))).toBe(true)
    expect(fs.existsSync(path.resolve(dir, 'js/utilities'))).toBe(true)
    expect(fs.existsSync(path.resolve(dir, 'js/base/index.js'))).toBe(true)
    expect(fs.existsSync(path.resolve(dir, 'js/components/index.js'))).toBe(true)
    expect(fs.existsSync(path.resolve(dir, 'js/utilities/index.js'))).toBe(true)
  })
})
