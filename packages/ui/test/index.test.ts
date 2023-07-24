import { getCss } from '../scripts/util'

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
})
