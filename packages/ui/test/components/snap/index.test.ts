import path from 'node:path'
// import { without } from 'lodash'

import { scssDir, componentTemplate } from '@/dirs'
import { compileScss } from '@/sass'
import { getCodegenOptions } from '@/options'
import allComponents from '@/allComponents'
import { stages } from '@/constants'
import { transformJsToSass } from '@/sass/utils'

// const baseDir = path.resolve(scssDir, 'components')

// const coms = (await fg(path.resolve(baseDir, '**/*.scss'))).map((x) => {
//   return {
//     name: path.relative(baseDir, x),
//     filename: x
//   }
// })
describe.each(allComponents.map((x) => ({ name: x })))('$name', ({ name }) => {
  for (const stage of stages) {
    it(stage, async () => {
      const { css } = await compileScss(componentTemplate, getCodegenOptions(), {
        'cp()': () => {
          return transformJsToSass(`${name}.defaults.${stage}`)
        }
      })
      expect(css).toMatchSnapshot()
    })
  }
})
