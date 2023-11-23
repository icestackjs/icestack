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
})
