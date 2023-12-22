import { transformCss2Js } from '@/shared'
describe('transformCss', () => {
  it('case0', () => {
    const caseCss = `.alert {
      display: grid;
      width: 100%;
      &-primary {
        color: red;
      }
      &.alert-hover{
        &:hover{
          color: blue;
        }
      }
    }
    @media (min-width: 640px) {
      .alert {
          grid-auto-flow: column;
          grid-template-columns: auto minmax(auto,1fr);
          justify-items: start;
          text-align: left
      }
    }`

    const result = transformCss2Js(caseCss)
    expect(result).toMatchSnapshot()
  })

  it('case1', () => {
    const caseCss = `.alert {
      display: grid;
      width: 100%;
      @apply text-xs;

      &-primary {
        color: red;
        @apply text-sm bg-red-200;
      }
      &.alert-hover{
        &:hover{
          color: blue;
          @apply text-md;
        }
      }
    }
    `

    const result = transformCss2Js(caseCss)
    expect(result).toMatchSnapshot()
  })

  it('case2', () => {
    const caseCss = `.alert {
      display: grid;
      width: 100%;
      @apply text-xs;
      @apply bg-primary text-primary-content [@media(hover:hover)]:hover:text-primary-content;
    }
    `

    const result = transformCss2Js(caseCss)
    expect(result).toMatchSnapshot()
  })

  it('case3', () => {
    const caseCss = `.alert {
      display: grid !important;
      width: 100%;
      @apply text-xs !important;
      @apply bg-primary text-primary-content [@media(hover:hover)]:hover:text-primary-content;
    }
    `

    const result = transformCss2Js(caseCss)
    expect(result).toMatchSnapshot()
  })

  it('merge case 0', () => {
    const selector = '.xxx'
    const res = transformCss2Js(`${selector} {
      --value: 0;
      --size: 5rem;
      --thickness: calc(var(--size) / 10);
    }
    ${selector}:after {
      @apply bg-current;
    }

    ${selector} {
      @apply relative inline-grid h-[var(--size)] w-[var(--size)] place-content-center rounded-full bg-transparent;
      vertical-align: middle;
      box-sizing: content-box;
    }
    ${selector}::-moz-progress-bar {
      @apply appearance-none bg-transparent;
    }
    ${selector}::-webkit-progress-value {
      @apply appearance-none bg-transparent;
    }
    ${selector}::-webkit-progress-bar {
      @apply appearance-none bg-transparent;
    }
    ${selector}:before,
    ${selector}:after {
      @apply absolute rounded-full;
      content: "";
    }
    ${selector}:before {
      @apply inset-0;
      background:
        radial-gradient(farthest-side, currentColor 98%, #0000) top/var(--thickness) var(--thickness)
          no-repeat,
        conic-gradient(currentColor calc(var(--value) * 1%), #0000 0);
      -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(99% - var(--thickness)),
        #000 calc(100% - var(--thickness))
      );
      mask: radial-gradient(
        farthest-side,
        #0000 calc(99% - var(--thickness)),
        #000 calc(100% - var(--thickness))
      );
    }
    ${selector}:after {
      inset: calc(50% - var(--thickness) / 2);
      transform: rotate(calc(var(--value) * 3.6deg - 90deg)) translate(calc(var(--size) / 2 - 50%));
    }
    
    `)
    expect(res).toMatchSnapshot()
  })

  it('merge case 1', () => {
    const selector = '.xxx'
    const res = transformCss2Js(`${selector} {
      --value: 0;
      --size: 5rem;
      --thickness: calc(var(--size) / 10);
      @apply bg-red-100;
    }

    ${selector} {
      @apply relative inline-grid h-[var(--size)] w-[var(--size)] place-content-center rounded-full bg-transparent;
      vertical-align: middle;
      box-sizing: content-box;
    }
    `)
    expect(res).toMatchSnapshot()
  })
})
