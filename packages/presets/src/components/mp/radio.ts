import { expandTypes, getSelector } from '@icestack/shared'
import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  prefix: {
    ignore: ['.wx-radio']
  },
  schema: (opts) => {
    const { selector, types } = opts
    return {
      selector,

      defaults: {
        base: {
          [selector]: {
            '.wx-radio-input': {
              apply: 'h-5 w-5 rounded-full',
              '&.wx-radio-input-checked': {
                '&::before': {
                  apply: 'h-4 w-4 leading-4',
                  css: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    'font-size': '1rem',
                    'text-align': 'center',
                    transform: 'translate(-50%, -50%) scale(1)'
                  }
                }
              }
            }
          }
        },

        styled: {
          [selector]: {
            ...expandTypes(types, (type) => {
              return {
                key: `&${getSelector(type)}`,
                value: {
                  '.wx-radio-input': {
                    '&.wx-radio-input-checked': {
                      apply: `border-${type} bg-${type} !important`,
                      '&::before': {
                        css: {
                          color: '#ffffff',
                          background: 'transparent'
                        }
                      }
                    }
                  }
                }
              }
            })
          }
        },
        utils: {
          [selector]: {
            [`&${getSelector('xs')}`]: {
              '.wx-radio-input': {
                apply: 'h-3 w-3',
                '&.wx-radio-input-checked': {
                  '&::before': {
                    apply: 'h-2 w-2 leading-2',
                    css: {
                      'font-size': '0.5rem'
                    }
                  }
                }
              }
            },
            [`&${getSelector('sm')}`]: {
              '.wx-radio-input': {
                apply: 'h-4 w-4',
                '&.wx-radio-input-checked': {
                  '&::before': {
                    apply: 'h-3 w-3 leading-3',
                    css: {
                      'font-size': '0.75rem'
                    }
                  }
                }
              }
            },
            [`&${getSelector('md')}`]: {
              '.wx-radio-input': {
                apply: 'h-5 w-5',
                '&.wx-radio-input-checked': {
                  '&::before': {
                    apply: 'h-4 w-4 leading-4',
                    css: {
                      'font-size': '1rem'
                    }
                  }
                }
              }
            },
            [`&${getSelector('lg')}`]: {
              '.wx-radio-input': {
                apply: 'h-6 w-6',
                '&.wx-radio-input-checked': {
                  '&::before': {
                    apply: 'h-5 w-5 leading-5',
                    css: {
                      'font-size': '1.25rem'
                    }
                  }
                }
              }
            },
            [`&${getSelector('circle')}`]: {
              '.wx-radio-input': {
                apply: 'rounded-full'
              }
            },
            [`&${getSelector('square')}`]: {
              '.wx-radio-input': {
                apply: 'rounded-sm'
              }
            }
          }
        }
      }
    }
  }
}

export default options
