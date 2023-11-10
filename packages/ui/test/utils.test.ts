import { compressCssSelector, applyStringToArray } from '@/components/shared'

describe('utils', () => {
  it('compressCssSelector case 0', () => {
    expect(compressCssSelector('h1, h2, h3')).toBe('h1,h2,h3')
    expect(compressCssSelector('>   div')).toBe('>div')
    expect(compressCssSelector('span  div')).toBe('span div')
    expect(compressCssSelector('span  ,div')).toBe('span,div')
  })

  it('applyStringToArray case 0', () => {
    expect(
      applyStringToArray({
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

  it('applyStringToArray case 1', () => {
    expect(
      applyStringToArray({
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

  it('applyStringToArray case 2', () => {
    const res0 = applyStringToArray({
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
    expect(res0).toEqual(applyStringToArray(res0))
  })
})
