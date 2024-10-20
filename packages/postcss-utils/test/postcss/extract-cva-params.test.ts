import extractCva from '@/plugins/extract-cva-params'
import postcss from 'postcss'

describe('extract-cva-params', () => {
  it('base', async () => {
    let res
    await postcss([
      extractCva({
        process(x) {
          res = x
        },
      }),
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

  it('define base', async () => {
    let res
    await postcss([
      extractCva({
        process(x) {
          res = x
        },
      }),
      // @ts-ignore
    ]).process(`
      
      .btn{
        /* @gbase ["xx","yyy"] */
        color:red;
      }

      .btn{
        /* @gb ["yy","yyy"] */
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
        },
      }),
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

  it('gv case1', async () => {
    let res
    await postcss([
      extractCva({
        process(x) {
          res = x
        },
      }),
      // @ts-ignore
    ]).process(`
      
      .btn{
        /* @gv intent="primary" ["btn"] */
        color:red;
      }

      
      .btn-primary{
        /* @gv intent="primary" ["btn","btn-primary"] */
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
        },
      }),
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

  it('gcv case1', async () => {
    let res
    await postcss([
      extractCva({
        process(x) {
          res = x
        },
      }),
      // @ts-ignore
    ]).process(`
      
      .bbb{
        /* @gcv intent="primary" ["bbb","ccc"] */
      }

      
      .ccc{
        /* @gcv intent="primary" ["aaa","bbb"] */
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
        },
      }),
      // @ts-ignore
    ]).process(`
      /* @dv intent="primary" */
     

    `)

    expect(res).toMatchSnapshot()
  })
})
