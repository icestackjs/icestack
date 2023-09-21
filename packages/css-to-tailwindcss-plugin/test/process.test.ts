import { compile } from '@icestack/css2js'
import { fixturesResolve } from './utils'
import { IProcessOptions, getCss, getPlugins } from '@/core/process'
async function process(entry: string, options: IProcessOptions = {}) {
  const plugins = await getPlugins(options)

  const res = await compile({
    path: entry,
    plugins
  })
  return res
}

describe('process', () => {
  it('default.css', async () => {
    const obj = await process(fixturesResolve('default.css'))
    // const obj2 = await process(fixturesResolve('default.scss'))
    // expect(obj).toEqual(obj2)
    expect(obj).toMatchSnapshot()
  })
  it('default.scss', async () => {
    const obj = await process(fixturesResolve('default.scss'))
    // const obj2 = await process(fixturesResolve('default.scss'))
    // expect(obj).toEqual(obj2)
    expect(obj).toMatchSnapshot()
  })

  it('common.css', async () => {
    const p = fixturesResolve('common.css')
    const obj = await process(p, {
      tailwindcssConfig: fixturesResolve('config/tailwind.config.js')
    })
    expect(obj).toMatchSnapshot()
    const css = await getCss(p, {
      tailwindcssConfig: fixturesResolve('config/tailwind.config.js')
    })
    expect(css).toMatchSnapshot()
  })

  it('common.css only extract layer', async () => {
    const p = fixturesResolve('common.css')
    const obj = await process(p, {
      // tailwindcssConfig: fixturesResolve('config/tailwind.config.js')
    })

    expect(obj).toMatchSnapshot()
    const css = await getCss(p)
    expect(css).toMatchSnapshot()
  })

  // it('defaults are same', async () => {
  //   const obj0 = await process(fixturesResolve('default.css'))
  //   const obj1 = await process(fixturesResolve('default.scss'))
  //   expect(obj0).toEqual(obj1)
  //   // const obj2 = await process(fixturesResolve('default.scss'))
  //   //

  // })
})
