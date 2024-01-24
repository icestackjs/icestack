import hash from 'object-hash'

export function objHash(object: hash.NotUndefined) {
  return hash(object, {
    ignoreUnknown: true
  })
}
