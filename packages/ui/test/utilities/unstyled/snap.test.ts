import path from 'node:path'
import fg from 'fast-glob'
import { resolve } from './utils'
import { scssDir } from '@/dirs'
import { compileScss } from '@/sass'
import { getCodegenOptions } from '@/options'
const coms = (await fg(path.resolve(scssDir, 'utilities/unstyled', '*.scss'))).map((x) => {
  return path.basename(x, '.scss')
})
describe.each(coms)('%s', (com) => {
  it('snap', () => {
    const { css } = compileScss(resolve(com), getCodegenOptions())
    expect(css).toMatchSnapshot()
  })
})
