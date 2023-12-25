import { createContext, Config } from '@/index'
import { removeDefaultComponents } from '@/components'
import { DeepPartial } from '@/types'

describe('options merge', () => {
  it('merge case 0', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          override: () => {
            return {
              base: {
                '.xxx': {
                  apply: 'bg-red-300 text-sm leading-4 !important',
                  css: {
                    color: 'red'
                  }
                }
              }
            }
          }
        }
      },
      dryRun: true
      // outdir
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 1', async () => {
    const options: DeepPartial<Config> = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: ({ selector }) => {
            return {
              utils: {
                [`${selector}::after`]: {
                  css: {
                    border: 'none'
                  }
                },
                [selector]: {
                  css: {
                    'border-style': 'solid'
                  }
                }
              }
            }
          }
        }
      },
      dryRun: true
      // outdir
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 2', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            ({ selector }) => {
              return {
                utils: {
                  [`${selector}::after`]: {
                    css: {
                      border: 'none'
                    }
                  },
                  [selector]: {
                    css: {
                      'border-style': 'solid'
                    }
                  }
                }
              }
            }
          ]
        }
      },
      dryRun: true
      // outdir
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 3', async () => {
    const selector = '.btn'
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            {
              utils: {
                [`${selector}::after`]: {
                  css: {
                    border: 'none'
                  }
                },
                [selector]: {
                  css: {
                    'border-style': 'solid'
                  }
                }
              }
            }
          ]
        }
      },
      dryRun: true
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 4', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: `
          .btn::after{
            border:none;
          }
          .btn{
            border-style:solid;
          }
          `
        }
      },
      dryRun: true
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 5', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            `
          .btn::after{
            border:none;
          }
          .btn{
            border-style:solid;
          }
          `
          ]
        }
      },
      dryRun: true
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 6', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            `
          .btn::after{
            border:none;
          }
          
          `,
            {
              utils: {
                '.btn': {
                  css: {
                    'border-style': 'solid'
                  }
                }
              }
            }
          ]
        }
      },
      dryRun: true
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 7', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            `
          .btn::after{
            border:none;
          }
          
          `,
            `.btn{
            border-style:solid;
          }`
          ]
        }
      },
      dryRun: true
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 8', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            `
          .btn::after{
            border:none;
          }
          
          `,
            ({ selector }) => {
              return {
                utils: {
                  [selector]: {
                    css: {
                      'border-style': 'solid'
                    }
                  }
                }
              }
            }
          ]
        }
      },
      dryRun: true
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 9', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: [
            `
          .btn::after{
            border:none;
          }
          
          `,
            ({ selector }) => {
              return {
                utils: {
                  [selector]: {
                    css: {
                      'border-style': 'solid'
                    }
                  }
                }
              }
            }
          ]
        }
      },
      dryRun: true
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 10', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: {
            utils: [
              `
            .btn::after{
              border:none;
            }
            
            `,
              ({ selector }) => {
                return {
                  [selector]: {
                    css: {
                      'border-style': 'solid'
                    }
                  }
                }
              }
            ]
          }
        }
      },
      dryRun: true
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 11', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: {
            utils: [
              ({ selector }) => {
                return {
                  [selector]: {
                    '&::after': {
                      css: {
                        border: 'none'
                      }
                    },
                    css: {
                      'border-style': 'solid'
                    }
                  }
                }
              }
            ]
          }
        }
      },
      dryRun: true
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 12', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: {
            utils: ({ selector }) => {
              return {
                [selector]: {
                  '&::after': {
                    css: {
                      border: 'none'
                    }
                  },
                  css: {
                    'border-style': 'solid'
                  }
                }
              }
            }
          }
        }
      },
      dryRun: true
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })
})
