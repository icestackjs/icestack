import path from 'node:path'
import { LRUCache } from 'lru-cache'
import findup from 'findup-sync'
import flatCache from 'flat-cache'
import { pkgName } from '@/constants'
export const cache = new LRUCache({
  max: 1024,
  ttl: 0,
  ttlAutopurge: false
})

export function findNodeModules(cwd: string = process.cwd()) {
  return findup('node_modules', {
    cwd
  })
}

export function getFileCache(id: string, cwd?: string) {
  const p = findNodeModules(cwd) || path.resolve(process.cwd(), './node_modules')
  return flatCache.load(id, path.resolve(p, '.cache/' + pkgName))
}
