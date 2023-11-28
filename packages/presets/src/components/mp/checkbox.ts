import { expandTypes, getSelector } from '@icestack/shared'
import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  prefix: {
    ignore: ['.wx-checkbox']
  },
  schema: (opts) => {
    const { selector, types } = opts
    return {
      selector,
      defaults: {
        base: {
          [selector]: {
            '.wx-checkbox-input': {
              apply: 'h-5 w-5 rounded-sm', // rounded-full',
              '&.wx-checkbox-input-checked': {
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
                  '.wx-checkbox-input': {
                    '&.wx-checkbox-input-checked': {
                      apply: `border-${type} bg-${type}`,
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
              '.wx-checkbox-input': {
                apply: 'h-3 w-3',
                '&.wx-checkbox-input-checked': {
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
              '.wx-checkbox-input': {
                apply: 'h-4 w-4',
                '&.wx-checkbox-input-checked': {
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
              '.wx-checkbox-input': {
                apply: 'h-5 w-5',
                '&.wx-checkbox-input-checked': {
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
              '.wx-checkbox-input': {
                apply: 'h-6 w-6',
                '&.wx-checkbox-input-checked': {
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
              '.wx-checkbox-input': {
                apply: 'rounded-full'
              }
            },
            [`&${getSelector('square')}`]: {
              '.wx-checkbox-input': {
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
