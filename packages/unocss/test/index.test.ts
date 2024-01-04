import path from 'node:path'
import { loadPresetOptions } from '@/index'
const loadDirectory = path.resolve(__dirname, '../my-ui')
describe('index', () => {
  it('loadPresetOptions default', () => {
    const options = loadPresetOptions({
      loadDirectory,
      loadConfig: true
    })
    expect(options).toMatchSnapshot()
  })
})
