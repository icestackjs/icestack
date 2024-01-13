import hash from 'object-hash'
import { getCodegenOptions } from '@/index'
describe('config hash', () => {
  it('hash case 0', () => {
    expect(hash({})).toBe('323217f643c3e3f1fe7532e72ac01bb0748c97be')
  })

  it('hash case 1', () => {
    expect(hash(getCodegenOptions())).toBe('f844b27fb45ab09823a3a95f8896ebe2bbadb0f0')
  })

  it('hash case 2', () => {
    let config = getCodegenOptions()
    expect(hash(config)).toBe('f844b27fb45ab09823a3a95f8896ebe2bbadb0f0')
    config = getCodegenOptions()
    expect(hash(config)).toBe('f844b27fb45ab09823a3a95f8896ebe2bbadb0f0')
  })

  it('hash case 3', () => {
    let config = getCodegenOptions()
    expect(hash(config)).toBe('f844b27fb45ab09823a3a95f8896ebe2bbadb0f0')
    config = getCodegenOptions({
      log: false,
      dryRun: true
    })
    expect(hash(config)).toBe('1ab322bb0107a835daafec899c25cdeeac11dd71')
  })

  it('hash case 4', () => {
    const config = {
      xx: () => {}
    }
    const xxx = hash(config)

    config.xx = () => {
      return 'xxx'
    }
    expect(hash(config)).not.toBe(xxx)

    config.xx = () => {
      return 'xxxccc'
    }
    expect(hash(config)).not.toBe(xxx)
  })
})
