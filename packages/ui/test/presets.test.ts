import { getCodegenOptions } from '@/options'
import { miniprogramPreset } from '@/presets'
describe('presets', () => {
  it('miniprogramPreset', () => {
    const opt = getCodegenOptions({
      presets: [miniprogramPreset()]
    })
    expect(opt).toMatchSnapshot()
  })
})
