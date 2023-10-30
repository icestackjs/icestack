import { IDefaults, OptionFn, expandColorsMap } from './shared'

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'rounded-box overflow-hidden bg-transparent',
      css: {
        appearance: 'none',
        '--range-shdw': 'var(--base-content)'
      }
    },
    focusVisibleSliderThumb: {
      css: {
        '--focus-shadow': '0 0 0 6px rgba(var(--base-400)) inset, 0 0 0 2rem rgba(var(--range-shdw)) inset'
      }
    },
    focusVisibleMozRangeThumb: {
      css: {
        '--focus-shadow': '0 0 0 6px rgba(var(--base-400)) inset, 0 0 0 2rem rgba(var(--range-shdw)) inset'
      }
    },
    sliderRunnableTrack: {
      apply: 'rounded-box bg-base-content/10 h-2 w-full'
    },
    mozRangeTrack: {
      apply: 'rounded-box bg-base-content/10 h-2 w-full'
    },
    sliderThumb: {
      apply: 'rounded-box bg-base-400 relative h-6 w-6 border-none',
      css: {
        appearance: 'none',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'rgba(var(--range-shdw))',
        '--filler-size': '100rem',
        '--filler-offset': '0.6rem',
        'box-shadow': `0 0 0 3px rgba(var(--range-shdw)) inset,
      var(--focus-shadow, 0 0),
      calc(var(--filler-size) * -1 - var(--filler-offset)) 0 0 var(--filler-size)`
      }
    },
    mozRangeThumb: {
      apply: 'rounded-box bg-base-400 relative h-6 w-6 border-none',
      css: {
        top: '50%',
        color: 'rgba(var(--range-shdw))',
        '--filler-size': '100rem',
        '--filler-offset': '0.5rem',
        'box-shadow': `0 0 0 3px rgba(var(--range-shdw)) inset,
      var(--focus-shadow, 0 0),
      calc(var(--filler-size) * -1 - var(--filler-offset)) 0 0 var(--filler-size)`
      }
    }
  },
  base: {
    default: {
      apply: 'h-6 w-full cursor-pointer'
    },
    focus: {
      css: {
        outline: 'none'
      }
    }
  },
  utils: {
    sizes: {
      xs: {
        default: {
          apply: 'h-4'
        },
        sliderRunnableTrack: {
          apply: 'h-1'
        },
        mozRangeTrack: {
          apply: 'h-1'
        },
        sliderThumb: {
          apply: 'h-4 w-4',
          css: {
            '--filler-offset': '0.4rem'
          }
        },
        mozRangeThumb: {
          apply: 'h-4 w-4',
          css: {
            '--filler-offset': '0.4rem'
          }
        }
      },
      sm: {
        default: {
          apply: 'h-5'
        },
        sliderRunnableTrack: {
          apply: 'h-1'
        },
        mozRangeTrack: {
          apply: 'h-1'
        },
        sliderThumb: {
          apply: 'h-5 w-5',
          css: {
            '--filler-offset': '0.5rem'
          }
        },
        mozRangeThumb: {
          apply: 'h-5 w-5',
          css: {
            '--filler-offset': '0.5rem'
          }
        }
      },
      md: {
        default: {
          apply: 'h-6'
        },
        sliderRunnableTrack: {
          apply: 'h-2'
        },
        mozRangeTrack: {
          apply: 'h-2'
        },
        sliderThumb: {
          apply: 'h-6 w-6',
          css: {
            '--filler-offset': '0.6rem'
          }
        },
        mozRangeThumb: {
          apply: 'h-6 w-6',
          css: {
            '--filler-offset': '0.6rem'
          }
        }
      },
      lg: {
        default: {
          apply: 'h-8'
        },
        sliderRunnableTrack: {
          apply: 'h-4'
        },
        mozRangeTrack: {
          apply: 'h-4'
        },
        sliderThumb: {
          apply: 'h-8 w-8',
          css: {
            '--filler-offset': '1rem'
          }
        },
        mozRangeThumb: {
          apply: 'h-8 w-8',
          css: {
            '--filler-offset': '1rem'
          }
        }
      }
    }
  }
}

export const options: OptionFn = (opts) => {
  return {
    selector: '.range',
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: {
          css: {
            '--range-shdw': `var(--${cur})`
          }
        }
      }
    }),
    defaults
  }
}
