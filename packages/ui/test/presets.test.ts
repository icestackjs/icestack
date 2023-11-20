import { getCodegenOptions } from '@/options'
import { miniprogramPreset } from '@/presets'
describe('presets', () => {
  it('miniprogramPreset', () => {
    const opt = getCodegenOptions({
      presets: [miniprogramPreset()]
    })
    expect(opt).toMatchSnapshot()
  })

  it('presets merge case 0', () => {
    const opt = getCodegenOptions({
      presets: [miniprogramPreset()]
    })
    expect(opt).toMatchSnapshot()
  })
})
