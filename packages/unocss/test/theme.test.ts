import path from 'node:path'
import { getTheme } from '@/theme'
const loadDirectory = path.resolve(__dirname, '../my-ui')
describe('index', () => {
  it('getTheme default', () => {
    const options = getTheme(loadDirectory)
    expect(options).toMatchSnapshot()
  })
})
