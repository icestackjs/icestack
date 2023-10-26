import path from 'node:path'
import fg from 'fast-glob'
import { resolve } from './utils'
import { scssDir } from '@/dirs'
import { compileScss } from '@/sass'
import { getCodegenOptions } from '@/options'
const coms = (await fg(path.resolve(scssDir, 'utilities/global', '*.scss'))).map((x) => {
  return path.basename(x, '.scss')
})
describe.skip.each(coms)('%s', (com) => {
  it('snap', async () => {
    const { css } = await compileScss(resolve(com), getCodegenOptions())
    expect(css).toMatchSnapshot()
  })
})
