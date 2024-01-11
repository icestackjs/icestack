import postcss from 'postcss'
import plugin from '@/index'
describe('index', () => {
  it('plugin', () => {
    // @ts-ignore
    const res = postcss([plugin()]).process(`
    @icestack base;
    @icestack components;
    @icestack utilities;
    `)
    expect(res.css).toMatchSnapshot()
  })

  it('plugin', () => {
    // @ts-ignore
    const res = postcss([plugin()]).process(`
    @icestack base.xxxx;
    @icestack components.ddsdsdksaljfds;
    @icestack utilities.dsad.dfsf.ds.fd;
    `)
    expect(res.css).toMatchSnapshot()
  })
})
