import { transformCss2Js } from '@/postcss'

export default () => {
  return transformCss2Js(`.no-animation {
    --animation-btn: 0s;
    --animation-input: 0s;
    --skeleton-duration: 0s;
  }
  .tab-border-none {
    --tab-border: 0px;
  }
  .tab-border {
    --tab-border: 1px;
  }
  .tab-border-2 {
    --tab-border: 2px;
  }
  .tab-border-3 {
    --tab-border: 3px;
  }
  .tab-rounded-none {
    --tab-radius: 0;
  }
  .tab-rounded-lg {
    --tab-radius: 0.5rem;
  }
  `)
}
