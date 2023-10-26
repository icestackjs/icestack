import { getJsObj, extractAll } from '@/extract'
import { getCodegenOptions } from '@/options'
describe('extract', () => {
  it('getJsObj', async () => {
    const obj = await extractAll(getCodegenOptions())
    expect(obj).toBeTruthy()
    expect(obj).toMatchSnapshot()
  })
})
