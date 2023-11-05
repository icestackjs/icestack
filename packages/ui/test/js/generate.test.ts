import path from 'node:path'
import { generateIndexCode } from '@/js/generate'
describe.skipIf(path.sep === '\\')('generate', () => {
  it('writeFileSync', () => {})
  // it('case 0', () => {
  //   expect(generateIndexCode(['global/glass', 'styled/artboard', 'base/button'])).toMatchSnapshot()
  // })

  // it('case 1', () => {
  //   expect(generateIndexCode(['global/glass', 'styled/glass', 'base/glass'])).toMatchSnapshot()
  // })
})
