import { compressCssSelector, preprocessCssInJs } from '@/utils'

describe('utils', () => {
  it('compressCssSelector case 0', () => {
    expect(compressCssSelector('h1, h2, h3')).toBe('h1,h2,h3')
    expect(compressCssSelector('>   div')).toBe('>div')
    expect(compressCssSelector('span  div')).toBe('span div')
    expect(compressCssSelector('span  ,div')).toBe('span,div')
  })

  it('preprocessCssInJs case 0', () => {
    expect(
      preprocessCssInJs({
        '.x': {
          css: {
            color: 'red'
          },
          apply: 'bg-gray-100 text-blue',
          '&-x   .c  >  .b': {
            css: {
              color: 'red'
            },
            apply: 'bg-gray-100 text-blue'
          }
        }
      })
    ).toMatchSnapshot()
  })

  it('preprocessCssInJs case 1', () => {
    expect(
      preprocessCssInJs({
        '.x .x': {
          css: {
            color: 'red'
          },
          apply: 'bg-gray-100 text-blue'
        },
        '.x  .x': {
          css: {
            color: 'blue'
          },
          apply: 'bg-gray-200 text-red'
        },
        '.x    .x': {
          css: {
            color: 'yello'
          },
          apply: 'bg-gray-300 text-blue'
        }
      })
    ).toMatchSnapshot()
  })

  it('preprocessCssInJs case 2', () => {
    const res0 = preprocessCssInJs({
      '.x .x': {
        css: {
          color: 'red'
        },
        apply: 'bg-gray-100 text-blue'
      },
      '.x  .x': {
        css: {
          color: 'blue'
        },
        apply: 'bg-gray-200 text-red'
      },
      '.x    .x': {
        css: {
          color: 'yello'
        },
        apply: 'bg-gray-300 text-blue'
      }
    })
    expect(res0).toMatchSnapshot()
  })

  it('preprocessCssInJs case 3', () => {
    const res0 = preprocessCssInJs({
      '.x .x': {
        css: {
          color: 'red'
        },
        apply: ['bg-gray-100 text-blue', 'bg-gray-400 text-yellow !important']
      },
      '.x  .x': {
        css: {
          color: 'blue'
        },
        apply: 'bg-gray-200 text-red'
      },
      '.x    .x': {
        css: {
          color: 'yello'
        },
        apply: 'bg-gray-300 text-blue'
      }
    })
    expect(res0).toMatchSnapshot()
  })

  it('preprocessCssInJs case 4', () => {
    const res0 = preprocessCssInJs({
      '.x .x': {
        css: {
          color: 'red'
        },
        apply: ['bg-gray-100 text-blue', 'bg-gray-400 text-yellow !important']
      }
    })
    expect(res0).toMatchSnapshot()
  })
})
