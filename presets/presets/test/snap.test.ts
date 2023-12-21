import { miniprogramPreset, mockupPreset } from '@/index'

describe('snap', () => {
  it('miniprogramPreset snap', () => {
    expect(miniprogramPreset).toBeDefined()
  })

  it('mockupPreset snap', () => {
    expect(mockupPreset).toBeDefined()
  })
})
