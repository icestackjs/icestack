import { CodegenOptions } from '@icestack/types'
import { preHandleOptions } from '@/index'

describe('index', () => {
  describe('preHandleOptions', () => {
    it('preHandleOptions', () => {
      expect(preHandleOptions({})).toEqual({})
    })

    it('preHandleOptions case 0', () => {
      const res: Partial<CodegenOptions> = {
        base: {
          extraCss: '.xxx{}'
        }
      }
      const r = preHandleOptions(res)
      expect(Array.isArray(r.base?.extraCss)).toBe(true)
      expect(r).not.toEqual(res)
    })

    it('preHandleOptions case 1', () => {
      const res: Partial<CodegenOptions> = {
        base: {
          themes: {
            light: {
              extraCss: '--ce:#123243;'
            }
          }
        }
      }
      const r = preHandleOptions(res)
      expect(Array.isArray(r.base?.themes?.light?.extraCss)).toBe(true)
      expect(r).not.toEqual(res)
    })

    it('preHandleOptions case 2', () => {
      const res: Partial<CodegenOptions> = {
        utilities: {
          extraCss: `.xx{}`
        }
      }
      const r = preHandleOptions(res)
      expect(Array.isArray(r.utilities?.extraCss)).toBe(true)
      expect(r).not.toEqual(res)
    })

    it('preHandleOptions case 3', () => {
      const res: Partial<CodegenOptions> = {
        components: {
          ds: {
            extend: `.xx{}`
          }
        }
      }
      const r = preHandleOptions(res)
      expect(Array.isArray(r.components?.ds?.extend)).toBe(true)
      expect(r).not.toEqual(res)
    })
  })
})
