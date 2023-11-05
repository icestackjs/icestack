import path from 'node:path'
import klawSync from 'klaw-sync'
import { scssDir } from '@/dirs'
import { walkScssSync } from '@/utils'

describe('walk', () => {
  it('should ', () => {
    const fromDir = path.resolve(scssDir, 'components')
    const result = []
    for (const file of klawSync(fromDir, {
      nodir: true,
      filter: (item) => {
        return /\.scss$/.test(item.path)
      },
      traverseAll: true
      // depthLimit: -1
    })) {
      result.push(file)
    }
    expect(result.length > 0).toBe(true)
  })

  it('should 0', () => {
    const fromDir = path.resolve(scssDir, 'components')
    const result = []
    for (const file of walkScssSync(fromDir)) {
      result.push(file)
    }
    expect(result.length > 0).toBe(true)
  })

  it('should 1', () => {
    const fromDir = path.resolve(scssDir, 'base')
    const result = []
    for (const file of klawSync(fromDir, {
      nodir: true,
      filter: (item) => {
        return /\.scss$/.test(item.path)
      }
    })) {
      result.push(file)
    }
    expect(result.length > 0).toBe(true)
  })

  it('should 2', () => {
    const fromDir = path.resolve(scssDir, 'base')
    const result = []
    for (const file of walkScssSync(fromDir)) {
      result.push(file)
    }
    expect(result.length > 0).toBe(true)
  })
})
