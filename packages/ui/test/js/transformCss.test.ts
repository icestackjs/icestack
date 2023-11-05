import { transformCss2Js } from '@/utils'
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
})
