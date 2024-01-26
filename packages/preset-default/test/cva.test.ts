import { postcssProcess, extractCvaParamsPlugin, parse } from '@icestack/postcss-utils'
import { compileScssString } from '@icestack/scss'
import { components } from '@/components'
const types = ['primary', 'success', 'warning', 'error', 'neutral']
describe.each(
  Object.entries(components).map((x) => {
    return {
      name: x[0],
      value: x[1]
    }
  })
)('$name cva', ({ name, value }) => {
  it('snap', async () => {
    // try {
    const xx = value?.schema({
      selector: value.selector,
      types
    })

    const scss = (xx.defaults.base ?? '') + (xx.defaults.styled ?? '') + (xx.defaults.utils ?? '')
    const { css } = compileScssString(parse(scss).toString())
    let res
    await postcssProcess(
      [
        extractCvaParamsPlugin({
          process(xx) {
            res = xx
          }
        })
      ],
      css
    )
    expect(res).toMatchSnapshot()
    // } catch (error) {
    //   // radio
    //   console.error('Error: ' + name, error)
    // }
  })
})
