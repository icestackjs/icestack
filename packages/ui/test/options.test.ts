import { getCodegenOptions } from '@/options'

describe('options', () => {
  it('getCodegenOptions snap', () => {
    expect(getCodegenOptions()).toMatchSnapshot()
  })

  it('getCodegenOptions snap merge case 0', () => {
    expect(
      getCodegenOptions({
        mode: 'none',
        base: {
          extraCss: `:host{color:red;}`
        },
        presets: [
          {
            base: {
              extraCss: `.aaa{color:blue;}`
            }
          }
        ]
      })
    ).toMatchSnapshot()
  })

  it('getCodegenOptions snap merge case 1', () => {
    expect(
      getCodegenOptions({
        mode: 'none',
        base: {
          extraCss: `:host{color:red;}`
        },
        presets: [
          {
            base: {
              extraCss: `:host{color:blue;}`
            }
          }
        ]
      })
    ).toMatchSnapshot()
  })

  it('getCodegenOptions snap merge case 2', () => {
    const opts = getCodegenOptions({
      mode: 'none',
      base: {
        extraCss: `:host{color:red;}`
      },
      presets: [
        {
          base: {
            extraCss: `:host{color:blue;}
            
            .d{color:red;}`
          }
        }
      ]
    })
    // expect(opts).toMatchSnapshot()
    expect(opts.base.extraCss).toMatchSnapshot()
  })

  it('getCodegenOptions snap merge case 3', () => {
    const opts = getCodegenOptions({
      mode: 'none',
      base: {
        themes: {
          xxx: {
            extraCss: `.a{color:red}`
          }
        }
      },
      presets: [
        {
          base: {
            themes: {
              xxx: {
                extraCss: `.a{color:yellow} .b{color:blue}`
              }
            }
          }
        }
      ]
    })
    // expect(opts).toMatchSnapshot()
    expect(opts.base.themes).toMatchSnapshot()
  })

  // it('getTailwindcssOptions snap', () => {
  //   expect(getTailwindcssOptions()).toMatchSnapshot()
  // })
})
