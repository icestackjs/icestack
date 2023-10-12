import path from 'node:path'
import sassTrue from 'sass-true'
import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('button', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('button'))
    expect(css).toMatchSnapshot()
  })

  it('scss', () => {
    const sassFile = path.join(__dirname, 'button.test.scss')
    sassTrue.runSass({ describe, it }, sassFile)
  })
})
