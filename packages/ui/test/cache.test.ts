import path from 'node:path'
import flatCache from 'flat-cache'
import { findNodeModules } from '@/cache'
describe('cache', () => {
  it('findNodeModules', () => {
    expect(findNodeModules(__dirname)).toBe(path.resolve(__dirname, '../node_modules'))
  })

  it('file cache', () => {
    const p = findNodeModules(__dirname)
    if (p) {
      const cache = flatCache.load('base/index', path.resolve(p, '.cache/@icestack/ui'))

      cache.setKey('aaa', { hash: '111' })

      cache.save()

      const a = cache.all()
      expect(a).toBeTruthy()
    }
  })
})
