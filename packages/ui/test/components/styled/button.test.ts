import { resolve } from './utils'
import { compileScss, resolveTailwindcss } from '@/sass'
import { colors } from '@/colors'
describe('button', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('button'))
    expect(css).toMatchSnapshot()
  })

  it('snap resolved', async () => {
    const css = await compileScss(resolve('button'))
    expect(
      await resolveTailwindcss({
        css,
        config: {
          content: [{ raw: '' }],
          theme: {
            extend: {
              colors: {
                ...colors
              }
            }
          }
        }
      })
    ).toMatchSnapshot()
  })
})
