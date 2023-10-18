import merge from 'merge'
import { getCss } from '@/utils'

describe('main', () => {
  it('default', async () => {
    const result = await getCss({
      corePlugins: {
        preflight: true
      }
    })
    expect(result.css).toMatchSnapshot()
  })

  it('preflight false', async () => {
    const result = await getCss()
    expect(result.css).toMatchSnapshot()
  })

  it('@apply case', async () => {
    const result = await getCss({
      css: `.btn{
        @apply flex items-center bg-teal-600 text-yellow-500 !important;
        line-height: 20px;
      }`
    })
    expect(result.css).toMatchSnapshot()
  })

  it('custom theme', async () => {
    const result = await getCss({
      css: `.btn{
        @apply bg-primary text-primary-content;
      }`,
      theme: {
        extend: {
          colors: {
            primary: 'rgb(var(--primary) / <alpha-value>)',
            'primary-content': 'rgb(var(--primary-color) / <alpha-value>)'
          }
        }
      }
    })
    expect(result.css).toMatchSnapshot()
  })

  it('merge case 0', () => {
    const obj = merge.recursive(true, undefined, { a: 1 }, undefined)
    expect(obj).toEqual({ a: 1 })
  })
})
