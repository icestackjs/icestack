// import { without } from 'lodash'

import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'
import { componentsNames } from '@/components'
import { stages } from '@/constants'

// const baseDir = path.resolve(scssDir, 'components')

// const coms = (await fg(path.resolve(baseDir, '**/*.scss'))).map((x) => {
//   return {
//     name: path.relative(baseDir, x),
//     filename: x
//   }
// })
describe.each(componentsNames.map((x) => ({ name: x })))('$name', ({ name }) => {
  const ctx = createContext(getCodegenOptions())
  for (const stage of stages) {
    it(stage, () => {
      const { css } = ctx.compileScssWithCp(name, stage)
      expect(css).toMatchSnapshot()
    })
  }
})

describe('custom components', () => {
  const ctx = createContext(
    getCodegenOptions({
      components: {
        custom: {
          extra: {
            '.custom': {
              css: {
                color: 'red'
              },
              apply: ['bg-blue-500']
            }
          },
          selector: '.custom'
        }
      }
    })
  )
  for (const stage of stages) {
    it('custom component ' + stage, () => {
      const { css } = ctx.compileScssWithCp('custom', stage)
      expect(css).toMatchSnapshot()
    })
  }
})
