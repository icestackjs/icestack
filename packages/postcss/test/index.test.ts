import path from 'node:path'
import plugin from '@/index'
import postcss from 'postcss'

describe('index', () => {
  it('plugin case base 0', async () => {
    const res = await postcss([
      plugin({
        configFile: path.resolve(__dirname, 'icestack.config.cjs'),
      }),
      // @ts-ignore
    ]).process(`
    @icestack base;
    `)
    expect(res.css).toMatchSnapshot()
  })

  it('plugin case components 0', async () => {
    const res = await postcss([
      plugin({
        configFile: path.resolve(__dirname, 'icestack.config.cjs'),
      }),
      // @ts-ignore
    ]).process(`
    @icestack components;
    `)
    expect(res.css).toMatchSnapshot()
  })

  it('plugin case components name 0', async () => {
    const res = await postcss([
      plugin({
        configFile: path.resolve(__dirname, 'icestack.config.cjs'),
      }),
      // @ts-ignore
    ]).process(`
    @icestack components.alert;
    `)
    expect(res.css).toMatchSnapshot()
  })

  it('plugin case components name base 0', async () => {
    const res = await postcss([
      plugin({
        configFile: path.resolve(__dirname, 'icestack.config.cjs'),
      }),
      // @ts-ignore
    ]).process(`
    @icestack components.alert.base;
    `)
    expect(res.css).toMatchSnapshot()
  })

  it('plugin case utilities 0', async () => {
    const res = await postcss([
      plugin({
        configFile: path.resolve(__dirname, 'icestack.config.cjs'),
      }),
      // @ts-ignore
    ]).process(`
    @icestack utilities;
    `)
    expect(res.css).toMatchSnapshot()
  })

  // it('plugin case 1', async () => {
  //   const res = await postcss([
  //     plugin({
  //       configFile: path.resolve(__dirname, 'icestack.config.cjs')
  //     })
  //     // @ts-ignore
  //   ]).process(`
  //   @icestack base.xxxx;
  //   @icestack components.ddsdsdksaljfds;
  //   @icestack utilities.dsad.dfsf.ds.fd;
  //   `)
  //   expect(res.css).toMatchSnapshot()
  // })
})
