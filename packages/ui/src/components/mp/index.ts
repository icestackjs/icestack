import { expandTypes, getSelector } from '../shared'
import { ComponentsOptions, DeepPartial } from '@/types'

export const components: DeepPartial<ComponentsOptions> = {
  select: false,
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
  },
  radio: {
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
  },
  input: {
    extra: {
      '.input': {
        css: {
          'border-style': 'solid'
        }
      }
    }
  },
  range: {
    prefix: {
      ignore: ['.wx-slider']
    },
    selector: '.range',
    schema: ({ selector, types }) => {
      return {
        selector,
        defaults: {
          base: {
            [selector]: {
              '.wx-slider-wrapper': {
                apply: 'h-6',
                '.wx-slider-handle-wrapper': {
                  apply: 'h-2 rounded-full',
                  '.wx-slider-track': {
                    apply: 'h-6 rounded-tl-full rounded-bl-full',
                    css: {
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }
                  },
                  '.wx-slider-handle': {
                    apply: ['box-border', 'h-6 w-6 -ml-3 -mt-3 !important']
                  },
                  '.wx-slider-thumb': {
                    apply: ['box-border rounded-full border-4 border-solid', 'border-[#1aad19] h-6 w-6 -ml-3 -mt-3 !important']
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
                    '.wx-slider-wrapper': {
                      '.wx-slider-handle-wrapper': {
                        '.wx-slider-track': {
                          apply: `bg-${type} !important`
                        },
                        '.wx-slider-handle': {},
                        '.wx-slider-thumb': {
                          apply: [`border-${type} !important`]
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
                '.wx-slider-wrapper': {
                  apply: 'h-4',
                  '.wx-slider-handle-wrapper': {
                    apply: 'h-1',
                    '.wx-slider-track': {
                      apply: 'h-4'
                    },
                    '.wx-slider-handle': {
                      apply: 'h-4 w-4 -ml-2 -mt-2 !important'
                    },
                    '.wx-slider-thumb': {
                      apply: ['border-2 h-4 w-4 -ml-2 -mt-2 !important']
                    }
                  }
                }
              },
              [`&${getSelector('sm')}`]: {
                '.wx-slider-wrapper': {
                  apply: 'h-5',
                  '.wx-slider-handle-wrapper': {
                    apply: 'h-2',
                    '.wx-slider-track': {
                      apply: 'h-5'
                    },
                    '.wx-slider-handle': {
                      apply: 'h-5 w-5 -ml-2.5 -mt-2.5 !important'
                    },
                    '.wx-slider-thumb': {
                      apply: ['border-[3px] h-5 w-5 -ml-2.5 -mt-2.5 !important']
                    }
                  }
                }
              },
              [`&${getSelector('md')}`]: {
                '.wx-slider-wrapper': {
                  apply: 'h-6',
                  '.wx-slider-handle-wrapper': {
                    apply: 'h-2',
                    '.wx-slider-track': {
                      apply: 'h-6'
                    },
                    '.wx-slider-handle': {
                      apply: 'h-6 w-6 -ml-3 -mt-3 !important'
                    },
                    '.wx-slider-thumb': {
                      apply: ['border-4 h-6 w-6 -ml-3 -mt-3 !important']
                    }
                  }
                }
              },
              [`&${getSelector('lg')}`]: {
                '.wx-slider-wrapper': {
                  apply: 'h-8',
                  '.wx-slider-handle-wrapper': {
                    apply: 'h-3',
                    '.wx-slider-track': {
                      apply: 'h-8'
                    },
                    '.wx-slider-handle': {
                      apply: 'h-8 w-8 -ml-4 -mt-4 !important'
                    },
                    '.wx-slider-thumb': {
                      apply: ['border-[6px] h-8 w-8 -ml-4 -mt-4 !important']
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  textarea: {
    extra: {
      '.textarea': {
        css: {
          'border-style': 'solid'
        }
      }
    }
  },
  toggle: {
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
  },
  table: {
    schema: ({ selector }) => {
      return {
        selector,
        defaults: {
          base: {
            [selector]: {
              apply: ['relative w-full', 'rounded text-left text-sm'],
              css: {
                display: 'table'
              },
              '.thead': {
                css: {
                  display: 'table-header-group'
                },
                apply: ['whitespace-nowrap text-xs font-bold']
              },
              '.tbody': {
                css: {
                  display: 'table-row-group'
                }
              },
              '.tfoot': {
                css: {
                  display: 'table-footer-group'
                },
                apply: ['whitespace-nowrap text-xs font-bold']
              },
              '.tr': {
                css: {
                  display: 'table-row'
                }
              },
              '.td,.th': {
                apply: ['px-4 py-3 align-middle'],
                css: {
                  display: 'table-cell'
                }
              }
            }
          },
          utils: {
            [selector]: {
              [`&${getSelector('xs')}`]: {
                ':not(.thead):not(.tfoot) .tr': {
                  apply: 'text-xs'
                },
                '.th,.td': {
                  apply: 'px-2 py-1'
                }
              },
              [`&${getSelector('sm')}`]: {
                ':not(.thead):not(.tfoot) .tr': {
                  apply: 'text-sm'
                },
                '.th,.td': {
                  apply: 'px-3 py-2'
                }
              },
              [`&${getSelector('md')}`]: {
                ':not(.thead):not(.tfoot) .tr': {
                  apply: 'text-sm'
                },
                '.th,.td': {
                  apply: 'px-4 py-3'
                }
              },
              [`&${getSelector('lg')}`]: {
                ':not(.thead):not(.tfoot) .tr': {
                  apply: 'text-base'
                },
                '.th,.td': {
                  apply: 'px-6 py-4'
                }
              }
            }
          }
        }
      }
    }
  }
}
