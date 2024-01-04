import path from 'node:path'
import { getRules } from '@/rules'
const loadDirectory = path.resolve(__dirname, '../my-ui')
describe('index', () => {
  it('getRules default', () => {
    const options = getRules(loadDirectory)
    expect(options).toMatchSnapshot()
  })

  it('getRules get tab', () => {
    const options = getRules(loadDirectory)
    expect(options.find((x) => x[0] === 'tab')).toMatchSnapshot()
  })
})
