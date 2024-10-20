import path from 'node:path'
import { getTheme } from '@/theme'
import ci from 'ci-info'

const loadDirectory = path.resolve(__dirname, '../my-ui')
describe.skipIf(ci.isCI)('index', () => {
  it('getTheme default', () => {
    const options = getTheme(loadDirectory)
    expect(options).toMatchSnapshot()
  })
})
