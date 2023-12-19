import { miniprogramPreset, mockupPreset } from '@/index'

describe('snap', () => {
  it('miniprogramPreset snap', () => {
    expect(miniprogramPreset()).toMatchSnapshot()
  })

  it('mockupPreset snap', () => {
    expect(mockupPreset()).toMatchSnapshot()
  })
})
