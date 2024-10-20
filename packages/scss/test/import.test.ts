import path from 'node:path'
import { pathToFileURL } from 'node:url'
// import { parse } from '@icestack/postcss-utils'
import { compileScssString } from '@/index'

describe('import', () => {
  it('import ', () => {
    const scss = `@import 'foundation/code', 'foundation/lists';`
    // const ast = parse(scss)
    // console.log(ast)
    const { css } = compileScssString(scss, {
      importers: [
        {
          findFileUrl(url, ctx) {
            // console.log(ctx)
            const ppp = path.resolve(__dirname, url)
            return new URL(pathToFileURL(ppp))
            // if (url === 'foundation/code') {

            // } else if (url === 'foundation/lists') {
            //   return new URL(url.slice(1), pathToFileURL('node_modules'))
            // }
          },
        },
      ],
    })
    expect(css).toMatchSnapshot()
  })
})
