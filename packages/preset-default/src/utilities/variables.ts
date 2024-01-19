import { css } from '@/types'

export default () => {
  return css`
    .no-animation {
      --animation-btn: 0s;
      --animation-input: 0s;
      --skeleton-duration: 0s;
    }
  `
}
