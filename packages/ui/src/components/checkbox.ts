import { IDefaults, OptionFn, expandColorsMap } from './shared'
function generateDefault(typeName: string) {
  return {
    apply: `border-${typeName} [@media(hover:hover)]:hover:border-${typeName}`,
    css: {
      '--chkbg': `var(--${typeName})`,
      '--chkfg': `var(--${typeName}-content)`
    }
  }
}

function generateFocus(typeName: string) {
  return {
    apply: `outline-${typeName}`
  }
}

function generateChecked(typeName: string) {
  return {
    apply: `border-${typeName} bg-${typeName} text-${typeName}-content`
  }
}

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'border-base-content rounded-btn h-6 w-6 cursor-pointer appearance-none border border-opacity-20',
      css: {
        '--chkbg': 'var(--base-content)',
        '--chkfg': 'var(--base-400)'
      }
    },
    focusVisible: {
      apply: 'outline-base-content outline outline-2 outline-offset-2'
    },
    checked: {
      apply: 'bg-base-content bg-no-repeat',
      css: {
        animation: 'checkmark var(--animation-input, 0.2s) ease-out',
        'background-image': `linear-gradient(-45deg, transparent 65%, rgba(var(--chkbg)) 65.99%),
        linear-gradient(45deg, transparent 75%, rgba(var(--chkbg)) 75.99%),
        linear-gradient(-45deg, rgba(var(--chkbg)) 40%, transparent 40.99%),
        linear-gradient(
          45deg,
          rgba(var(--chkbg)) 30%,
          rgba(var(--chkfg)) 30.99%,
          rgba(var(--chkfg)) 40%,
          transparent 40.99%
        ),
        linear-gradient(-45deg, rgba(var(--chkfg)) 50%, rgba(var(--chkbg)) 50.99%)`
      }
    },
    indeterminate: {
      apply: 'bg-base-content bg-no-repeat',
      css: {
        animation: 'checkmark var(--animation-input, 0.2s) ease-out',
        'background-image': `linear-gradient(90deg, transparent 80%, rgba(var(--chkbg)) 80%),
        linear-gradient(-90deg, transparent 80%, rgba(var(--chkbg)) 80%),
        linear-gradient(
          0deg,
          rgba(var(--chkbg)) 43%,
          rgba(var(--chkfg)) 43%,
          rgba(var(--chkfg)) 57%,
          rgba(var(--chkbg)) 57%
        )`
      }
    },
    disabled: 'bg-base-content cursor-not-allowed border-transparent opacity-20'
  },
  base: {
    default: {
      apply: 'shrink-0'
    }
  },
  utils: {
    sizes: {
      xs: {
        default: {
          apply: 'h-4 w-4'
        }
      },
      sm: {
        default: {
          apply: 'h-5 w-5'
        }
      },
      md: {
        default: {
          apply: 'h-6 w-6'
        }
      },
      lg: {
        default: {
          apply: 'h-8 w-8'
        }
      }
    }
  }
}
export const options: OptionFn = (opts) => {
  return {
    selector: '.checkbox',
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur),
        focusVisible: generateFocus(cur),
        checked: generateChecked(cur)
      }
    }),
    defaults
  }
}
