import { IDefaults, OptionFn, expandColorsMap } from './shared'

export function generateBtnInjectVars(type: string) {
  return {
    outline: `text-${type}`,
    default: `border-${type} bg-${type} text-${type}-content outline-${type}`,
    hover: `border-${type}-hover bg-${type}-hover`,
    active: `border-${type}-active bg-${type}-active`,
    outlineActive: `border-${type}-active bg-${type}-active text-${type}-content`,
    outlineHover: `border-${type}-hover bg-${type}-hover text-${type}-content`
  }
}

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'border-base-400 bg-base-400 text-base-content outline-base-400 no-underline',
      css: {
        'border-width': 'var(--border-btn, 1px)'
      }
    },
    focusVisible: {
      apply: 'outline outline-2 outline-offset-2'
    },
    hover: 'border-base-300 bg-base-300',
    active: { apply: 'border-base-500 bg-base-500' },
    outline: {
      apply: 'border-current bg-transparent shadow-none text-base-content'
    },
    outlineHover: {
      apply: `border-base-900 bg-base-900 text-base-100`
    },
    outlineActive: {
      apply: 'border-base-1100 bg-base-1100 text-base-100'
    },
    ghost: {
      apply: 'border border-transparent bg-transparent text-current shadow-none outline-current'
    },
    ghostActive: {
      apply: 'border-opacity-0 bg-base-content bg-opacity-20'
    },
    link: {
      apply: 'text-primary border-transparent bg-transparent underline shadow-none outline-current'
    },
    linkActive: {
      apply: 'border-transparent bg-transparent underline'
    },
    disabled: {
      apply: 'bg-neutral text-base-content border-opacity-0 bg-opacity-20 text-opacity-20'
    },
    glass: {
      apply: 'shadow-none outline-current'
    },
    glassActive: {
      // apply:'',
      css: {
        '--glass-opacity': '25%',
        '--glass-border-opacity': '15%'
      }
    }
    // inputType: {
    //   default: 'border-primary bg-primary text-primary-content',
    //   active: 'border-primary-active bg-primary-active',
    //   focusVisible: 'outline-primary'
    // }
  },
  base: {
    default: {
      apply:
        'rounded-btn inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent text-center transition duration-200 ease-out min-h-12 h-12 px-4',
      css: {
        'font-size': '0.875rem',
        'line-height': '1em'
      }
    },
    disabled: {
      apply: 'pointer-events-none'
    }
  },
  utils: {
    sizes: {
      xs: {
        default: {
          apply: 'min-h-6 h-6 px-2',
          css: {
            'font-size': '0.75rem'
          }
        }
      },
      sm: {
        default: {
          apply: 'min-h-8 h-8 px-3',
          css: {
            'font-size': '0.875rem'
          }
        }
      },
      md: {
        default: {
          apply: 'min-h-12 h-12 px-4',
          css: {
            'font-size': '0.875rem'
          }
        }
      },
      lg: {
        default: {
          apply: 'min-h-16 h-16 px-6',
          css: {
            'font-size': '1.125rem'
          }
        }
      },
      wide: {
        default: {
          apply: 'w-64'
        }
      },
      block: {
        default: {
          apply: 'w-full'
        }
      }
    },
    shapes: {
      square: {
        default: {
          apply: 'h-12 w-12 p-0'
        },
        sizes: {
          xs: {
            default: {
              apply: 'h-6 w-6 p-0'
            }
          },
          sm: {
            default: {
              apply: 'h-8 w-8 p-0'
            }
          },
          md: {
            default: {
              apply: 'h-12 w-12 p-0'
            }
          },
          lg: {
            default: {
              apply: 'h-16 w-16 p-0'
            }
          }
        }
      },
      circle: {
        default: {
          apply: 'h-12 w-12 rounded-full p-0'
        },
        sizes: {
          xs: {
            default: {
              apply: 'h-6 w-6 rounded-full p-0'
            }
          },
          sm: {
            default: {
              apply: 'h-8 w-8 rounded-full p-0'
            }
          },
          md: {
            default: {
              apply: 'h-12 w-12 rounded-full p-0'
            }
          },
          lg: {
            default: {
              apply: 'h-16 w-16 rounded-full p-0'
            }
          }
        }
      }
    }
  }
}
export const options: OptionFn = (opts) => {
  return {
    selector: '.btn',
    colors: expandColorsMap(opts.types, (cur) => {
      return generateBtnInjectVars(cur)
    }),
    defaults
  }
}
