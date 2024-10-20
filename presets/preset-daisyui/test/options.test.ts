import preset from '@/index'

import { getCodegenOptions } from '@icestack/config'

describe('options', () => {
  it('daisyui options', () => {
    const opt = getCodegenOptions({
      presets: [preset()],
    })
    expect(opt).toMatchSnapshot()
  })
})
