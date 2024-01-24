import postcss from 'postcss'
import extractCva, { baseRegex, compoundVariantRegex, defaultVariantRegex, matchAll, variantRegex } from '@/plugins/extract-cva-params'

describe('extract-cva-params', () => {
  describe('baseRegex', () => {
    it('baseRegex case 0', () => {
      let res = matchAll(baseRegex, '@base=xxx')
      expect(res.length).toBe(1)

      res = matchAll(baseRegex, '@b=xxx')
      expect(res.length).toBe(1)

      res = matchAll(baseRegex, '@b "xxx"')
      expect(res.length).toBe(1)
    })
  })

  describe('variantRegex', () => {
    it('variantRegex case 0', () => {
      let res = matchAll(variantRegex, '@v ssd=true')
      expect(res.length).toBe(1)

      res = matchAll(variantRegex, '@variant dsa="xxx"')
      expect(res.length).toBe(1)

      res = matchAll(variantRegex, '@v ssd')
      expect(res.length).toBe(1)

      // res = matchAll(variantRegex, '@b xxx')
      // expect(res.length).toBe(1)
      // expect(res[0][1]).toBe(undefined)
    })
  })

  describe('defaultVariantRegex', () => {
    it('defaultVariantRegex case 0', () => {
      let res = matchAll(defaultVariantRegex, '@dv ssd=true')
      expect(res.length).toBe(1)

      res = matchAll(defaultVariantRegex, '@defaultVariant dsa="xxx"')
      expect(res.length).toBe(1)

      res = matchAll(defaultVariantRegex, '@dv ssd')
      expect(res.length).toBe(1)

      // res = matchAll(variantRegex, '@b xxx')
      // expect(res.length).toBe(1)
      // expect(res[0][1]).toBe(undefined)
    })
  })

  it('base', async () => {
    let res
    await postcss([
      extractCva({
        process(x) {
          res = x
        }
      })
      // @ts-ignore
    ]).process(`
      /* @base */
      .btn{
        color:red;
      }
    `)

    expect(res).toMatchSnapshot()
  })
})
