import path from 'node:path'
import { without } from 'lodash'
import fg from 'fast-glob'
import { scssDir } from '@/dirs'
describe('components', () => {
  it('should ', () => {
    expect(true).toBe(true)
  })
  // it('styled', async () => {
  //   const res0 = (await fg(path.resolve(scssDir, 'components/styled', '*.scss'))).map((x) => {
  //     return path.basename(x, '.scss')
  //   })

  //   const res1 = (await fg(path.resolve(__dirname, 'components/styled', '*.test.ts'))).map((x) => {
  //     return path.basename(x, '.test.ts')
  //   })
  //   const lacks = without(res0, ...res1)
  //   console.log(lacks)
  //   expect(lacks.length).toBe(0)
  // })
})
