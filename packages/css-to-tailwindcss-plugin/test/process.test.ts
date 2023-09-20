import { fixturesResolve } from './utils'
import { process } from '@/core/process'
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

  // it('defaults are same', async () => {
  //   const obj0 = await process(fixturesResolve('default.css'))
  //   const obj1 = await process(fixturesResolve('default.scss'))
  //   expect(obj0).toEqual(obj1)
  //   // const obj2 = await process(fixturesResolve('default.scss'))
  //   // 

  // })
})
