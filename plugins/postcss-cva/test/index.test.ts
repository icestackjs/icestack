import path from 'node:path'
import postcss from 'postcss'
import postcssCva from '@/index'
const css = String.raw
describe('index', () => {
  it('case 0', async () => {
    const { css: code } = await postcss([
      postcssCva({
        cwd: path.resolve(__dirname, './fixtures')
      })
      // @ts-ignore
    ]).process(css`
      /* @meta path="button" */
      .btn {
        /* @b */
      }
      .btn-primary {
        /* @v type="primary" */
      }
      .btn-xs {
        /* @v size="xs" */
      }
      .uppercase {
        /* @cv type="primary" size="xs" */
      }
      /* @dv type="primary" */

      /* @gb ["rounded"] */
      /* @gv type="primary" ["shadow-sm"] */
      /* @gcv type="primary" size="xs" ["p-1"] */
    `)
    expect(code).toMatchSnapshot()
  })

  it('case 1', async () => {
    const { css: code } = await postcss([
      postcssCva({
        cwd: path.resolve(__dirname, './fixtures')
      })
      // @ts-ignore
    ]).process(css`
      /* @meta path="button.js" */
      .btn {
        /* @b */
      }
      .btn-primary {
        /* @v type="primary" */
      }
      .btn-xs {
        /* @v size="xs" */
      }
      .uppercase {
        /* @cv type="primary" size="xs" */
      }

      /* @dv type="primary" */

      /* @gb ["rounded"] */
      /* @gv type="primary" ["shadow-sm"] */
      /* @gcv type="primary" size="xs" ["p-1"] */
    `)
    expect(code).toMatchSnapshot()
  })

  it('case 2', async () => {
    const { css: code } = await postcss([
      postcssCva({
        cwd: path.resolve(__dirname, './fixtures')
      })
      // @ts-ignore
    ]).process(css`
      /* @meta path="in/button.cts" */
      .btn {
        /* @b */
      }
      .btn-primary {
        /* @v type="primary" */
      }
      .btn-xs {
        /* @v size="xs" */
      }
      .uppercase {
        /* @cv type="primary" size="xs" */
      }

      /* @dv type="primary" */

      /* @gb ["rounded"] */
      /* @gv type="primary" ["shadow-sm"] */
      /* @gcv type="primary" size="xs" ["p-1"] */
    `)
    expect(code).toMatchSnapshot()
  })
})
