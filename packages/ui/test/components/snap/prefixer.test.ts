import path from 'node:path'
// import { without } from 'lodash'
import fg from 'fast-glob'
import { scssDir } from '@/dirs'
import { compileScss } from '@/sass'
import { getCodegenOptions } from '@/options'

const baseDir = path.resolve(scssDir, 'components')

const coms = (await fg(path.resolve(baseDir, '**/*.scss'))).map((x) => {
  return {
    name: path.relative(baseDir, x),
    filename: x
  }
})
describe.each(coms)('$name prefixer', ({ filename }) => {
  it('snap', async () => {
    const { css } = await compileScss(
      filename,
      getCodegenOptions({
        prefix: 'som-'
      })
    )
    expect(css).toMatchSnapshot()
  })
})
