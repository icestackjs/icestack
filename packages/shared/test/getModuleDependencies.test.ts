import path from 'node:path'
import { getModuleDependencies } from '@/getModuleDependencies'
describe('getModuleDependencies', () => {
  it('case 0', () => {
    const indexPath = path.resolve(__dirname, './fixtures/index.cjs')
    const set = getModuleDependencies(indexPath)
    expect(set.size).toBe(3)
  })
})
