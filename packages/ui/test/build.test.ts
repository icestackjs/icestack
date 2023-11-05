import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'

describe('build', () => {
  it('build base', () => {
    const ctx = createContext(getCodegenOptions())
    ctx.generate('base')
  })
})
