import path from 'node:path'
import { getConfig, getPreflightCss, getRules } from '../preset'
const loadDirectory = path.resolve(__dirname, '../my-ui')
describe('unocss', () => {
  it('getConfig', () => {
    expect(getConfig(loadDirectory)).toMatchSnapshot()
  })

  it('getPreflightCss', () => {
    expect(getPreflightCss(loadDirectory)).toMatchSnapshot()
  })

  it('getRules', () => {
    expect(getRules(loadDirectory)).toMatchSnapshot()
  })
})
