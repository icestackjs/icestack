import postcss, { comment } from 'postcss'
import extractCva, { baseRegex, compoundVariantRegex, defaultVariantRegex, matchAll, variantRegex, pickComment, extractParams } from '@/plugins/extract-cva-params'

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

  describe('pickComment', () => {
    it('pickComment base case 0', () => {
      const res = pickComment(
        comment({
          text: '@b v'
        })
      )
      expect(res.type).toBe('base')
      expect(res.next).toBe(true)
      expect(res.suffix).toBe(' v')
    })
  })

  describe('extractParams', () => {
    it('extractParams case 0', () => {
      let res = extractParams(' xxx="xx"  yyy="xxx" ')
      expect(res.xxx.value).toBe('xx')
      expect(res.yyy.value).toBe('xxx')
      res = extractParams(' xxx=this  yyy="xxx" ')
      expect(res.xxx).toBe(undefined)
      expect(res.yyy.value).toBe('xxx')
      // expect(res.xxx.this).toBe(true)
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
      
      .btn{
        /* @base */
        /* @base */
        color:red;
      }

      .btn{
        /* @base */
        /* @base */
        color:red;
      }
    `)

    expect(res).toMatchSnapshot()
  })

  it('v case1', async () => {
    let res
    await postcss([
      extractCva({
        process(x) {
          res = x
        }
      })
      // @ts-ignore
    ]).process(`
      
      .btn{
        /* @v intent="primary" */
        color:red;
      }

      
      .btn-primary{
        /* @v intent="primary" */
        color:red;
      }

    `)

    expect(res).toMatchSnapshot()
  })

  it('cv case1', async () => {
    let res
    await postcss([
      extractCva({
        process(x) {
          res = x
        }
      })
      // @ts-ignore
    ]).process(`
      
      .bbb{
        /* @cv intent="primary" */
      }

      
      .ccc{
        /* @cv intent="primary" */
      }

    `)

    expect(res).toMatchSnapshot()
  })
  it('dv case1', async () => {
    let res
    await postcss([
      extractCva({
        process(x) {
          res = x
        }
      })
      // @ts-ignore
    ]).process(`
      /* @dv intent="primary" */
     

    `)

    expect(res).toMatchSnapshot()
  })
})
