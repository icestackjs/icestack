import { applyListToString } from '@/components/shared'

describe('components', () => {
  it('applyListToString case 0', () => {
    expect(
      applyListToString({
        apply: [1, 2, 3, 4]
      })
    ).toEqual({
      apply: '1 2 3 4'
    })
  })

  it('applyListToString case 1', () => {
    expect(
      applyListToString({
        a: {
          b: {
            apply: [1, 2, 3, 4]
          }
        }
      })
    ).toEqual({
      a: {
        b: {
          apply: '1 2 3 4'
        }
      }
    })
  })
})
