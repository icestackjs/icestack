import { expandTypes, getSelector } from '@icestack/shared'
import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  prefix: {
    ignore: ['.wx-switch', '.wx-checkbox']
  },
  schema: ({ selector, types }) => {
    return {
      selector,
      defaults: {
        base: `
        ${selector}{
          .wx-switch-wrapper{
            .wx-switch-input{
              @apply rounded-full box-content;
              @apply h-8 w-12;
              &.wx-switch-input-checked{
                &::after{
                  @apply translate-x-[calc(1rem+1PX)];
                }
              }
              &::before{
                @apply rounded-full;
                @apply h-8 w-12;
              }
              &::after{
                @apply rounded-full;
                @apply h-8 w-8;            
              }
            }
          }
          &-disabled{
            .wx-switch-wrapper{
              .wx-switch-input{
                @apply opacity-50;
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
            .wx-switch-wrapper{
              .wx-switch-input{
                &.wx-switch-input-checked{
                  @apply border-${type} bg-${type} #{!important};
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
            .wx-switch-wrapper{
              .wx-switch-input{
                @apply h-4 w-6;
                &.wx-switch-input-checked{
                  &::after{
                    @apply translate-x-[calc(0.5rem+1PX)];
                  }
                }
                &::before{
                  @apply h-4 w-6;
                }
                &::after{
                  @apply h-4 w-4;
                }
              }
            }
          }
          &-sm{
            .wx-switch-wrapper{
              .wx-switch-input{
                @apply h-6 w-9;
                &.wx-switch-input-checked{
                  &::after{
                    @apply translate-x-[calc(0.75rem+1PX)];
                  }
                }
                &::before{
                  @apply h-6 w-9;
                }
                &::after{
                  @apply h-6 w-6;
                }
              }
            }
          }

          &-md{
            .wx-switch-wrapper{
              .wx-switch-input{
                @apply h-8 w-12;
                &.wx-switch-input-checked{
                  &::after{
                    @apply translate-x-[calc(1rem+1PX)];
                  }
                }
                &::before{
                  @apply h-8 w-12;
                }
                &::after{
                  @apply h-8 w-8;
                }
              }
            }
          }
          &-lg{
            .wx-switch-wrapper{
              .wx-switch-input{
                @apply h-10 w-16;
                &.wx-switch-input-checked{
                  &::after{
                    @apply translate-x-[calc(1.5rem+1PX)];
                  }
                }
                &::before{
                  @apply h-10 w-16;
                }
                &::after{
                  @apply h-10 w-10;
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
