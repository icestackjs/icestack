import { resolve } from './utils'
import { compileScss, resolveTailwindcss } from '@/sass'
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
              borderRadius: {
                btn: 'var(--rounded-box, 1rem)'
              },
              minHeight: {
                12: '3rem'
              }
            }
          }
        }
      })
    ).toMatchSnapshot()
  })
})
