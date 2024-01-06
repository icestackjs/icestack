import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  postcss: {
    prefix: {
      ignore: ['.wx-radio']
    }
  },
  schema: (opts) => {
    const { selector, types } = opts
    return {
      selector,

      defaults: {
        base: `
        ${selector}{
          .wx-radio-input{
            @apply h-5 w-5 rounded-full;
            &.wx-radio-input-checked{
              &::before{
                @apply h-4 w-4 leading-4;
                position: absolute;
                top: 50%;
                left: 50%;
                font-size: 1rem;
                text-align: center;
                transform: translate(-50%, -50%) scale(1);
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
                .wx-radio-input {
                  &.wx-radio-input-checked {
                    @apply border-${type} bg-${type} #{!important};
                    &::before {
                      color: #ffffff;
                      background:transparent;
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
            .wx-radio-input{
              @apply h-3 w-3;
              &.wx-radio-input-checked{
                &::before{
                  @apply h-2 w-2 leading-2;
                  font-size: 0.5rem;
                }
              }
            }
          }
          &-sm{
            .wx-radio-input{
              @apply h-4 w-4;
              &.wx-radio-input-checked{
                &::before{
                  @apply h-3 w-3 leading-3;
                  font-size: 0.75rem;
                }
              }
            }
          }
          &-md{
            .wx-radio-input{
              @apply h-5 w-5;
              &.wx-radio-input-checked{
                &::before{
                  @apply h-4 w-4 leading-4;
                  font-size: 1rem;
                }
              }
            }
          }
          &-lg{
            .wx-radio-input{
              @apply h-6 w-6;
              &.wx-radio-input-checked{
                &::before{
                  @apply h-5 w-5 leading-5;
                  font-size: 1.25rem;
                }
              }
            }
          }
          &-circle{
            .wx-radio-input{
              @apply rounded-full;
            }
          }
          &-square{
            .wx-radio-input{
              @apply rounded-sm;
            }
          }
        }
         
        `
      }
    }
  }
}

export default options
