import { expandTypes, getSelector } from '../shared'
import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  prefix: {
    ignore: ['.wx-switch', '.wx-checkbox']
  },
  schema: ({ selector, types }) => {
    return {
      selector,
      defaults: {
        base: {
          [selector]: {
            '.wx-switch-wrapper': {
              '.wx-switch-input': {
                apply: ['rounded-full box-content', 'h-8 w-12'],
                '&.wx-switch-input-checked': {
                  '&::after': {
                    apply: 'translate-x-4'
                  }
                },
                '&::before': {
                  apply: ['rounded-full', 'h-8 w-12']
                },
                '&::after': {
                  apply: ['rounded-full', 'h-8 w-8']
                }
              }
            },
            [`&${getSelector('disabled')}`]: {
              '.wx-switch-wrapper': {
                '.wx-switch-input': {
                  apply: 'opacity-50'
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
                  '.wx-switch-wrapper': {
                    '.wx-switch-input': {
                      '&.wx-switch-input-checked': {
                        apply: [`border-${type} bg-${type} !important`]
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
              '.wx-switch-wrapper': {
                '.wx-switch-input': {
                  apply: ['h-4 w-6'],
                  '&.wx-switch-input-checked': {
                    '&::after': {
                      apply: 'translate-x-2'
                    }
                  },
                  '&::before': {
                    apply: ['h-4 w-6']
                  },
                  '&::after': {
                    apply: ['h-4 w-4']
                  }
                }
              }
            },
            [`&${getSelector('sm')}`]: {
              '.wx-switch-wrapper': {
                '.wx-switch-input': {
                  apply: ['h-6 w-9'],
                  '&.wx-switch-input-checked': {
                    '&::after': {
                      apply: 'translate-x-3'
                    }
                  },
                  '&::before': {
                    apply: ['h-6 w-9']
                  },
                  '&::after': {
                    apply: ['h-6 w-6']
                  }
                }
              }
            },
            [`&${getSelector('md')}`]: {
              '.wx-switch-wrapper': {
                '.wx-switch-input': {
                  apply: ['h-8 w-12'],
                  '&.wx-switch-input-checked': {
                    '&::after': {
                      apply: 'translate-x-4'
                    }
                  },
                  '&::before': {
                    apply: ['h-8 w-12']
                  },
                  '&::after': {
                    apply: ['h-8 w-8']
                  }
                }
              }
            },
            [`&${getSelector('lg')}`]: {
              '.wx-switch-wrapper': {
                '.wx-switch-input': {
                  apply: ['h-10 w-16'],
                  '&.wx-switch-input-checked': {
                    '&::after': {
                      apply: 'translate-x-6'
                    }
                  },
                  '&::before': {
                    apply: ['h-10 w-16']
                  },
                  '&::after': {
                    apply: ['h-10 w-10']
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

export default options
