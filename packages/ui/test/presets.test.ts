import { getCodegenOptions } from '@/options'
import { miniprogramPreset } from '@/presets'
import { createContext } from '@/context'
describe('presets', () => {
  it('miniprogramPreset', () => {
    const opt = getCodegenOptions({
      presets: [miniprogramPreset()]
    })
    expect(opt).toMatchSnapshot()
  })

  it('miniprogramPreset checkbox css', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [miniprogramPreset()]
    })
    const res = await ctx.buildComponents()
    expect(res.checkbox).toMatchSnapshot()
  })

  it('presets merge case 0', () => {
    const opt = getCodegenOptions({
      presets: [miniprogramPreset()]
    })
    expect(opt).toMatchSnapshot()
  })
})
