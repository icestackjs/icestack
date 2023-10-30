import { handleOptions } from '@/components/shared'
import { options } from '@/components/alert'
import { getCodegenOptions } from '@/options'
describe.skip('alert', () => {
  it('merge options case 0', () => {
    const opts = handleOptions(
      options({
        options: getCodegenOptions(undefined, true),
        types: []
      }),
      {
        extend: undefined,
        override: undefined
      }
    )
    expect(opts).toMatchSnapshot()
  })

  it('merge options case 1', () => {
    const opts = handleOptions(
      options({
        options: getCodegenOptions(undefined, true),
        types: []
      }),
      {
        extend: undefined,
        override: {
          defaults: {
            styled: {
              default: {
                apply: []
              }
            },
            base: {
              default: {
                apply: ['bg-base-200'],
                css: {
                  color: 'red'
                }
              }
            }
          }
        }
      }
    )
    expect(opts).toMatchSnapshot()
  })

  it('merge options case 2', () => {
    const opts = handleOptions(
      options({
        options: getCodegenOptions(undefined, true),
        types: []
      }),
      {
        extend: {
          defaults: {
            styled: {
              default: {
                apply: []
              }
            },
            base: {
              default: {
                apply: ['bg-base-200'],
                css: {
                  color: 'red'
                }
              }
            }
          }
        },
        override: {
          defaults: {
            styled: {
              default: {
                apply: []
              }
            },
            base: {
              default: {
                apply: ['bg-base-200'],
                css: {
                  color: 'red'
                }
              }
            }
          }
        }
      }
    )
    expect(opts).toMatchSnapshot()
  })

  it('merge options case 3', () => {
    const opts = handleOptions(
      options({
        options: getCodegenOptions(undefined, true),
        types: []
      }),
      {
        extend: {
          defaults: {
            styled: {
              default: {
                apply: []
              }
            },
            base: {
              default: {
                apply: ['bg-base-200'],
                css: {
                  color: 'red'
                }
              }
            }
          }
        }
      }
    )
    expect(opts).toMatchSnapshot()
  })
})
