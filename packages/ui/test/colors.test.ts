import { blue, gray, presetDarkPalettes, presetPalettes } from '@ant-design/colors'
import { getColors } from '@/colors'
import { getCodegenOptions } from '@/options'
describe('colors', () => {
  // it('snap', () => {
  //   expect(colors).toMatchSnapshot()
  // })

  it('getColors case 0', () => {
    expect(getColors(getCodegenOptions())).toMatchSnapshot()
  })

  it('getColors case 1', () => {
    expect(
      getColors(
        getCodegenOptions({
          varPrefix: {
            varPrefix: '--som-'
          }
        })
      )
    ).toMatchSnapshot()
  })

  it('@ant-design/colors', () => {
    expect(blue).toMatchSnapshot('blue')
    expect(gray).toMatchSnapshot('gray')
    expect(presetPalettes).toMatchSnapshot('presetPalettes')
    expect(presetDarkPalettes).toMatchSnapshot('presetDarkPalettes')
  })
})
