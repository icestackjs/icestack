import type { ComponentsOptions, Preset } from '@icestack/types'

const components: ComponentsOptions = {
  mockup: {
    selector: '.mockup',
    schema: ({ selector }) => {
      return {
        selector,
        defaults: {
          base: `
          ${selector} {
            &-code {
              @apply relative overflow-hidden overflow-x-auto;
              pre[data-prefix] {
                &:before {
                  content: attr(data-prefix);
                  @apply inline-block text-right;
                }
              }
            }
            &-window {
              @apply relative overflow-hidden overflow-x-auto;
              pre[data-prefix] {
                &:before {
                  content: attr(data-prefix);
                  @apply inline-block text-right;
                }
              }
            }
            &-browser {
              @apply relative overflow-hidden overflow-x-auto;
              pre[data-prefix] {
                &:before {
                  content: attr(data-prefix);
                  @apply inline-block text-right;
                }
              }
            }
          }          
          `,
          styled: `
          ${selector} {
            &-code {
              @apply bg-neutral text-neutral-content rounded-box min-w-[18rem] py-5;
              direction: ltr;
              &:before {
                content: "";
                @apply mb-4 block h-3 w-3 rounded-full opacity-30;
                box-shadow:
                  1.4em 0,
                  2.8em 0,
                  4.2em 0;
              }
              pre {
                @apply pr-5;
                &:before {
                  content: "";
                  margin-right: 2ch;
                }
              }
              pre[data-prefix] {
                &:before {
                  content: attr(data-prefix);
                  @apply w-8 opacity-50;
                }
              }
            }
            &-window {
              @apply rounded-box flex flex-col pt-5;
              &:before {
                content: "";
                @apply mb-4 block aspect-square h-3 shrink-0 self-start rounded-full opacity-30 rtl:self-end;
                box-shadow:
                  1.4em 0,
                  2.8em 0,
                  4.2em 0;
              }
            }
            &-phone {
              display: inline-block;
              border: 4px solid #444;
              border-radius: 50px;
              background-color: #000;
              padding: 10px;
              margin: 0 auto;
              overflow: hidden;
              .camera {
                position: relative;
                top: 0px;
                left: 0px;
                background: #000;
                height: 25px;
                width: 150px;
                margin: 0 auto;
                border-bottom-left-radius: 17px;
                border-bottom-right-radius: 17px;
                z-index: 11;
                &:before {
                  content: "";
                  position: absolute;
                  top: 35%;
                  left: 50%;
                  width: 50px;
                  height: 4px;
                  border-radius: 5px;
                  background-color: #0c0b0e;
                  transform: translate(-50%, -50%);
                }
                &:after {
                  content: "";
                  position: absolute;
                  top: 20%;
                  left: 70%;
                  width: 8px;
                  height: 8px;
                  border-radius: 5px;
                  background-color: #0f0b25;
                }
              }
              .display {
                overflow: hidden;
                border-radius: 40px;
                margin-top: -25px;
              }
            }
            &-browser {
              @apply rounded-box;
              ${selector}-browser-toolbar {
                @apply my-3 inline-flex w-full items-center pr-[1.4em] rtl:flex-row-reverse;
                &:before {
                  content: "";
                  @apply mr-[4.8rem] inline-block aspect-square h-3 rounded-full opacity-30;
                  box-shadow:
                    1.4em 0,
                    2.8em 0,
                    4.2em 0;
                }
                .input {
                  @apply bg-base-200 relative mx-auto block h-7 w-96 overflow-hidden text-ellipsis whitespace-nowrap pl-8;
                  direction: ltr;
                  &:before {
                    content: "";
                    @apply absolute left-2 top-1/2 aspect-square h-3 -translate-y-1/2 rounded-full border-2 border-current opacity-60;
                  }
                  &:after {
                    content: "";
                    @apply absolute left-5 top-1/2 h-2 translate-y-1/4 -rotate-45 rounded-full border border-current opacity-60;
                  }
                }
              }
            }
          }
          
          `,
        },
      }
    },
  },
  artboard: {
    selector: '.artboard',
    schema: ({ selector }) => {
      return {
        selector,
        defaults: {
          base: `
          ${selector} {
            @apply w-full;
          }
          
          `,
          styled: ``,
          utils: `
          ${selector} {
            &-demo {
              @apply bg-base-300 text-base-content rounded-box;
              box-shadow:
                0 1px 3px 0 rgba(0, 0, 0, 0.1),
                0 1px 2px 0 rgba(0, 0, 0, 0.06);
            }
          }
          
          ${selector} {
            &-demo {
              @apply flex flex-none flex-col items-center justify-center;
            }
            &.phone {
              width: 320px;
              &-1 {
                width: 320px;
                height: 568px;
                &.horizontal,
                &${selector}-horizontal {
                  width: 568px;
                  height: 320px;
                }
              }
              &-2 {
                width: 375px;
                height: 667px;
                &.horizontal,
                &${selector}-horizontal {
                  width: 667px;
                  height: 375px;
                }
              }
              &-3 {
                width: 414px;
                height: 736px;
                &.horizontal,
                &${selector}-horizontal {
                  width: 736px;
                  height: 414px;
                }
              }
              &-4 {
                width: 375px;
                height: 812px;
                &.horizontal,
                &${selector}-horizontal {
                  width: 812px;
                  height: 375px;
                }
              }
              &-5 {
                width: 414px;
                height: 896px;
                &.horizontal,
                &${selector}-horizontal {
                  width: 896px;
                  height: 414px;
                }
              }
              &-6 {
                width: 320px;
                height: 1024px;
                &.horizontal,
                &${selector}-horizontal {
                  width: 1024px;
                  height: 320px;
                }
              }
            }
          }
          
          `,
        },
      }
    },
  },
}

const mockupPreset: () => Preset = () => {
  return {
    components,
  }
}

export default mockupPreset
