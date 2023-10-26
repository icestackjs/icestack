import { generate } from '@/generate'
import { getCodegenOptions } from '@/options'

describe('build', () => {
  it('build base', () => {
    generate({
      options: getCodegenOptions(),
      outSideLayerCss: 'base'
    })
  })
})
