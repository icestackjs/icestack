import postcss from 'postcss'
import gloablPostcss from '@/postcss/global'
describe('global', () => {
  it('at media hover', () => {
    const { css } = postcss([gloablPostcss]).process(`@media (hover: hover) {
      &:hover {
        color:red;
      }
    }`)
    expect(css).toMatchSnapshot()
  })

  it('universal selector case 0', () => {
    const { css } = postcss([
      gloablPostcss({
        global: {
          selector: {
            universal: 'view'
          }
        }
      })
    ]).process(`.btm-nav > * {
      border-color: currentColor
    }`)
    expect(css).toMatchSnapshot()
  })

  it('pseudo root case 0', () => {
    const { css } = postcss([
      gloablPostcss({
        global: {
          selector: {
            root: 'page'
          }
        }
      })
    ]).process(`:root .countdown {
      line-height: 1em;
    }`)
    expect(css).toMatchSnapshot()
  })
})
