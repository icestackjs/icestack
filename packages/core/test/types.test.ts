import { calcBase } from '@/base'

describe('calcBase', () => {
  it('types case 0', () => {
    const { types } = calcBase({
      base: {
        themes: {}
      },
      postcss: {}
    })
    expect(types.length).toBe(0)
  })

  it('types case 1', () => {
    const { types } = calcBase({
      base: {
        themes: {
          light: {
            types: {
              p: '#123456'
            }
          },
          dark: {
            types: {
              d: '#123456'
            }
          },
          dark0: {
            types: {
              d: '#123456'
            }
          }
        },
        themeSelectorTemplate(theme) {
          return `[data-mode="${theme}"]`
        }
      },
      postcss: {}
    })
    expect(types.length).toBe(2)
  })
})
