import { LRUCache } from 'lru-cache'
import findup from 'findup-sync'
import flatCache from 'flat-cache'
import { ensureDirSync } from '@/utils'
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

// export function getFileCache(){
//   return flatCache.load()
// }
