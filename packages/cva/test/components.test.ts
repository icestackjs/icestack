import { createCva } from '@/components'

describe('components', () => {
  const CVA = createCva()

  it('all components default', () => {
    const map: Record<string, string> = {}
    for (const [name, obj] of Object.entries(CVA)) {
      if (typeof obj === 'function') {
        map[name] = obj()
      } else if (typeof obj === 'object') {
        // @ts-ignore
        map[name] = Object.entries(obj).reduce((acc, [name, fn]) => {
          // @ts-ignore
          acc[name] = fn()
          return acc
        }, {})
      }
    }
    expect(map).toMatchSnapshot()
  })
})
