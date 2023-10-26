import { LRUCache } from 'lru-cache'

export const cache = new LRUCache({
  max: 1024,
  ttl: 0,
  ttlAutopurge: false
})
