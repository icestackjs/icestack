import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('bottom-navigation', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('bottom-navigation'))
    expect(css).toMatchSnapshot()
  })
})
