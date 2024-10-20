import { addCustomThemes } from '../add-customs-themes'
import { extendThemes } from '../extend-themes'

describe('index', () => {
  it('addCustomThemes', () => {
    expect(addCustomThemes()).toMatchSnapshot()
  })

  it('extendThemes', () => {
    expect(extendThemes()).toMatchSnapshot()
  })

  it('compose case 0', () => {
    const obj0 = extendThemes(addCustomThemes())
    const obj1 = addCustomThemes(extendThemes())
    expect(obj0).toEqual(obj1)
    expect(obj0).toMatchSnapshot()
  })
})
