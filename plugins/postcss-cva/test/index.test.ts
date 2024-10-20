import path from 'node:path'
import postcssCva from '@/index'
import postcss from 'postcss'

const css = String.raw
describe('index', () => {
  it('case 0', async () => {
    const { css: code } = await postcss([
      postcssCva({
        cwd: path.resolve(__dirname, './fixtures'),
        exports: {
          base: false,
          compoundVariants: false,
          defaultVariants: false,
          variants: false,
        },
      }),
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
        cwd: path.resolve(__dirname, './fixtures'),
        exports: {
          base: false,
          compoundVariants: false,
          defaultVariants: false,
          variants: false,
        },
      }),
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
        cwd: path.resolve(__dirname, './fixtures'),
        exports: {
          base: false,
          compoundVariants: false,
          defaultVariants: false,
          variants: false,
        },
      }),
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

  it('case 3', async () => {
    const { css: code } = await postcss([
      postcssCva({
        cwd: path.resolve(__dirname, './fixtures'),
        exports: {
          base: false,
          compoundVariants: false,
          defaultVariants: false,
          variants: false,
        },
      }),
      // @ts-ignore
    ]).process(css`
      /* @meta path="nest-btn" */
      .btn {
        /* @b */
      }
      .btn-primary {
        /* @v type="primary" */
      }
      .btn-xs {
        /* @v size="xs" */
      }
      .btn.btn-secondary {
        /* @b */
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

  it('case 4', async () => {
    // path.isAbsolute('nest-btn-4')
    const { css: code } = await postcss([
      postcssCva({
        cwd: path.resolve(__dirname, './fixtures'),
        exports: {
          base: false,
          compoundVariants: false,
          defaultVariants: false,
          variants: false,
        },
      }),
      // @ts-ignore
    ]).process(css`
      /* @meta path="./nest-btn-4" */
      .btn {
        /* @b */
      }
      .btn-primary {
        /* @v type="primary" */
      }
      .btn-xs {
        /* @v size="xs" */
      }
      .btn.btn-secondary {
        /* @b */
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

  it('exports case 0', async () => {
    const { css: code } = await postcss([
      postcssCva({
        cwd: path.resolve(__dirname, './fixtures'),
      }),
      // @ts-ignore
    ]).process(css`
      /* @meta path="export-btn-0" */
      .btn {
        /* @b */
      }
      .btn-primary {
        /* @v type="primary" */
      }
      .btn-xs {
        /* @v size="xs" */
      }
      .btn.btn-secondary {
        /* @b */
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

  it('exports case 1', async () => {
    const { css: code } = await postcss([
      postcssCva({
        cwd: path.resolve(__dirname, './fixtures'),
        exports: {
          base: false,
        },
      }),
      // @ts-ignore
    ]).process(css`
      /* @meta path="export-btn-1" */
      .btn {
        /* @b */
      }
      .btn-primary {
        /* @v type="primary" */
      }
      .btn-xs {
        /* @v size="xs" */
      }
      .btn.btn-secondary {
        /* @b */
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

  it('exports case 2', async () => {
    const { css: code } = await postcss([
      postcssCva({
        cwd: path.resolve(__dirname, './fixtures'),
        exports: {
          base: false,
          variants: false,
        },
      }),
      // @ts-ignore
    ]).process(css`
      /* @meta path="export-btn-2" */
      .btn {
        /* @b */
      }
      .btn-primary {
        /* @v type="primary" */
      }
      .btn-xs {
        /* @v size="xs" */
      }
      .btn.btn-secondary {
        /* @b */
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

  it('exports case 3', async () => {
    const { css: code } = await postcss([
      postcssCva({
        cwd: path.resolve(__dirname, './fixtures'),
        exports: {
          base: false,
          variants: false,
          compoundVariants: false,
        },
      }),
      // @ts-ignore
    ]).process(css`
      /* @meta path="export-btn-3" */
      .btn {
        /* @b */
      }
      .btn-primary {
        /* @v type="primary" */
      }
      .btn-xs {
        /* @v size="xs" */
      }
      .btn.btn-secondary {
        /* @b */
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
