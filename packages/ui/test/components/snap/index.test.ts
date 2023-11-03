// import { without } from 'lodash'

import { compileScssWithCp } from '@/sass'
import { getCodegenOptions } from '@/options'
import allComponents from '@/allComponents'
import { stages } from '@/constants'

// const baseDir = path.resolve(scssDir, 'components')

// const coms = (await fg(path.resolve(baseDir, '**/*.scss'))).map((x) => {
//   return {
//     name: path.relative(baseDir, x),
//     filename: x
//   }
// })
describe.each(allComponents.map((x) => ({ name: x })))('$name', ({ name }) => {
  for (const stage of stages) {
    it(stage, () => {
      const { css } = compileScssWithCp(getCodegenOptions(), name, stage)
      expect(css).toMatchSnapshot()
    })
  }
})
