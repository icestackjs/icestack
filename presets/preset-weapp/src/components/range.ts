import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  postcss: {
    prefix: {
      ignore: ['.wx-slider']
    }
  },
  schema: ({ selector, types }) => {
    return {
      selector,
      defaults: {
        base: `
        ${selector}{
          .wx-slider-wrapper{
            @apply h-6;
            .wx-slider-handle-wrapper{
              @apply h-2 rounded-full;
              .wx-slider-track{
                @apply h-6 rounded-tl-full rounded-bl-full;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
              }
              .wx-slider-handle{
                @apply box-border;
                @apply h-6 w-6 -ml-3 -mt-3 #{!important};
              }
              .wx-slider-thumb{
                @apply box-border rounded-full border-solid;
                @apply border-[#1aad19] border-[length:4PX] h-6 w-6 -ml-3 -mt-3 #{!important};
              }
            }
          }
        }
        `,
        styled: `
          ${selector}{
            ${types
              .map((type) => {
                return `
                &-${type}{
                  .wx-slider-wrapper{
                    .wx-slider-handle-wrapper{
                      .wx-slider-track{
                        @apply bg-${type} #{!important};
                      }
                      .wx-slider-thumb{
                        @apply border-${type} #{!important};
                      }
                    }
                  }
                }
              `
              })
              .join('\n')}
          }
        `,
        utils: `
          ${selector}{
            &-xs{
              .wx-slider-wrapper{
                @apply h-4;
                .wx-slider-handle-wrapper{
                  @apply h-1;
                  .wx-slider-track{
                    @apply h-4;
                  }
                  .wx-slider-handle{
                    @apply h-4 w-4 -ml-2 -mt-2 #{!important};
                  }
                  .wx-slider-thumb{
                    @apply border-[length:2PX] h-4 w-4 -ml-2 -mt-2 #{!important};
                  }
                }
              }
            }
            &-sm{
              .wx-slider-wrapper{
                @apply h-5;
                .wx-slider-handle-wrapper{
                  @apply h-2;
                  .wx-slider-track{
                    @apply h-5;
                  }
                  .wx-slider-handle{
                    @apply h-5 w-5 -ml-2.5 -mt-2.5 #{!important};
                  }
                  .wx-slider-thumb{
                    @apply border-[length:3PX] h-5 w-5 -ml-2.5 -mt-2.5 #{!important};
                  }
                }
              }
            }
            &-md{
              .wx-slider-wrapper{
                @apply h-6;
                .wx-slider-handle-wrapper{
                  @apply h-2;
                  .wx-slider-track{
                    @apply h-6;
                  }
                  .wx-slider-handle{
                    @apply h-6 w-6 -ml-3 -mt-3 #{!important};
                  }
                  .wx-slider-thumb{
                    @apply border-[length:4PX] h-6 w-6 -ml-3 -mt-3 #{!important};
                  }
                }
              }
            }
            &-lg{
              .wx-slider-wrapper{
                @apply h-8;
                .wx-slider-handle-wrapper{
                  @apply h-3;
                  .wx-slider-track{
                    @apply h-8;
                  }
                  .wx-slider-handle{
                    @apply h-8 w-8 -ml-4 -mt-4 #{!important};
                  }
                  .wx-slider-thumb{
                    @apply border-[length:6PX] h-8 w-8 -ml-4 -mt-4 #{!important};
                  }
                }
              }
            }
          }
        
        `
      }
    }
  }
}

export default options
