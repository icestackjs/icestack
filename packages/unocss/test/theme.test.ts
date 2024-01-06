import path from 'node:path'
import ci from 'ci-info'
import { getTheme } from '@/theme'
const loadDirectory = path.resolve(__dirname, '../my-ui')
describe.skipIf(ci.isCI)('index', () => {
  it('getTheme default', () => {
    const options = getTheme(loadDirectory)
    expect(options).toMatchSnapshot()
  })
})
