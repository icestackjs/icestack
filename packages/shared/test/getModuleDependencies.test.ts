import path from 'node:path'
import { getModuleDependencies } from '@/getModuleDependencies'

describe('getModuleDependencies', () => {
  it('case 0', async () => {
    const indexPath = path.resolve(__dirname, './fixtures/index.cjs')
    const set = await getModuleDependencies(indexPath)
    expect(set.length).toBe(3)
  })
})
