import gloablPostcss from '@/plugins/icestack'
import postcss from 'postcss'

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
        dryRun: true,
        postcss: {
          selector: {
            universal: 'view',
          },
        },
      }),
    ]).process(`.btm-nav > * {
      border-color: currentColor
    }`)
    expect(css).toMatchSnapshot()
  })

  it('pseudo root case 0', () => {
    const { css } = postcss([
      gloablPostcss({
        dryRun: true,
        postcss: {
          selector: {
            root: 'page',
          },
        },
      }),
    ]).process(`:root .countdown {
      line-height: 1em;
    }`)
    expect(css).toMatchSnapshot()
  })
})
