import { getJsObj, extractAll } from '@/extract'
import { getCodegenOptions } from '@/options'
describe('extract', () => {
  it.skip('getJsObj', async () => {
    const obj = await extractAll(getCodegenOptions())
    expect(obj).toBeTruthy()
    expect(obj).toMatchSnapshot()
  })

  it('getJsObj base', async () => {
    const obj = await getJsObj({
      options: getCodegenOptions(),
      outSideLayerCss: 'base'
    })
    expect(obj).toBeTruthy()
    expect(obj).toMatchSnapshot()
  })
})
