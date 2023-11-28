import { miniprogramPreset } from '@/index'

describe('mp', () => {
  it('miniprogramPreset snap', () => {
    expect(miniprogramPreset()).toMatchSnapshot()
  });
});