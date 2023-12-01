import { defuOverrideArray, defuOverrideApplyCss } from '@/utils'

describe('defu', () => {
  it('defuOverrideArray case 0', () => {
    const a = {
      a: {
        b: {
          c: [1, 2]
        }
      }
    }
    const b = {
      a: {
        b: {
          c: [3, 4]
        }
      }
    }
    expect(defuOverrideArray(b, a)).toEqual(b)
  })

  it('defuOverrideArray case 1', () => {
    const a = {
      a: {
        b: {
          a: [-1, 1],
          c: [1, 2]
        }
      }
    }
    const b = {
      a: {
        b: {
          c: [3, 4]
        }
      }
    }
    expect(defuOverrideArray(b, a)).toEqual({
      a: {
        b: {
          a: [-1, 1],
          c: [3, 4]
        }
      }
    })
  })

  it('defuOverrideApplyCss case 0', () => {
    const a = {
      apply: [1, 2],
      css: {
        a: 1,
        b: 2
      }
    }

    const b = {
      apply: [],
      css: {}
    }

    expect(defuOverrideApplyCss(b, a)).toEqual(b)
  })
})
