import postcssJs from 'postcss-js'
import type { AcceptedPlugin } from 'postcss'
import baseJsObj from '../../assets/js/base'
import countdownJsObj from '../../assets/js/components/styled/countdown'
import globalPostcss from '@/postcss/global'
import { getCodegenOptions } from '@/options'
describe('postcss-js', () => {
  it('globalPostcss case 0', () => {
    expect(postcssJs.sync([globalPostcss])(baseJsObj)).toMatchSnapshot()
  })

  it('globalPostcss case 1', () => {
    expect(
      postcssJs.sync([
        globalPostcss(
          getCodegenOptions({
            base: {
              selector: {
                dark: '.dark',
                light: '.light'
              }
            }
          })
        )
      ])(baseJsObj)
    ).toMatchSnapshot()
  })

  it('globalPostcss case 2', () => {
    expect(
      postcssJs.sync([
        globalPostcss(
          getCodegenOptions({
            global: {
              selector: {
                universal: 'view'
              }
            }
          })
        )
      ])(countdownJsObj)
    ).toMatchSnapshot()
  })
})
