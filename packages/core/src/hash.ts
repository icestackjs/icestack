import objHash from 'object-hash'

export function hash(object: objHash.NotUndefined) {
  return objHash(object, {
    ignoreUnknown: true
  })
}
