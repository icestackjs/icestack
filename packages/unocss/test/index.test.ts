import path from 'node:path'
import { loadPresetOptions } from '@/index'
import ci from 'ci-info'

const loadDirectory = path.resolve(__dirname, '../my-ui')
describe.skipIf(ci.isCI)('index', () => {
  it('loadPresetOptions default', () => {
    const options = loadPresetOptions({
      loadDirectory,
      loadConfig: true,
    })
    expect(options).toMatchSnapshot()
  })
})
