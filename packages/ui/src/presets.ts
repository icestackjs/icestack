import { transformCss2Js, expandTypes, getSelector } from './components/shared'
import type { CodegenOptions, DeepPartial } from './types'
// import { expandTypes, transformCss2Js } from '@/components/shared'

// @ts-ignore
export const miniprogramPreset: () => DeepPartial<CodegenOptions> = () => {
  return {
    global: {
      atMedia: {
        hover: false
      },
      selector: {
        universal: 'view' // ['view', 'text']
      },
      pseudo: {}
    },
    components: {
      table: false,
      button: {
        extra: {
          '.btn::after': {
            css: {
              border: 'none'
            }
          },
          '.btn': {
            css: {
              'border-style': 'solid'
            }
          }
        }
      },
      checkbox: {
        prefix: {
          ignore: ['.wx-checkbox-input']
        },
        schema: (opts) => {
          const { selector, types } = opts
          return {
            selector,

            defaults: {
              base: {
                [selector]: {
                  '.wx-checkbox-input': {
                    apply: 'h-5 w-5 rounded-full',
                    '&.wx-checkbox-input-checked': {
                      '&::before': {
                        apply: 'h-4 w-4 leading-4',
                        css: {
                          'font-size': '1rem',
                          'text-align': 'center',
                          transform: 'translate(-50%, -50%) scale(1)',
                          '-webkit-transform': 'translate(-50%, -50%) scale(1)'
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
    },
    base: {
      themes: {
        light: {
          selector: 'page'
        },
        dark: {
          selector: '.dark'
        }
      }
    }
  }
}
