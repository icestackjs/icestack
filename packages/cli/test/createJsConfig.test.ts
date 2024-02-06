import fs from 'node:fs'
import path from 'node:path'
import { createJsConfig } from '@/config'
describe('createJsConfig', () => {
  it('default output', () => {
    const { data, filename } = createJsConfig({
      outdir: 'my-ui'
    })
    fs.writeFileSync(path.resolve(__dirname, `./fixtures/default.cjs`), data, 'utf8')
    expect(data).toMatchSnapshot()
  })

  it('default typescript output', () => {
    const { data, filename } = createJsConfig({
      outdir: 'my-ui',
      format: 'ts'
    })
    fs.writeFileSync(path.resolve(__dirname, `./fixtures/default.ts`), data, 'utf8')
    expect(data).toMatchSnapshot()
  })

  it('preset output', () => {
    const { data, filename } = createJsConfig({
      outdir: 'my-ui',
      mode: 'preset'
    })
    fs.writeFileSync(path.resolve(__dirname, `./fixtures/preset.cjs`), data, 'utf8')
    expect(data).toMatchSnapshot()
  })
  it('preset typescript output', () => {
    const { data, filename } = createJsConfig({
      outdir: 'my-ui',
      format: 'ts',
      mode: 'preset'
    })
    fs.writeFileSync(path.resolve(__dirname, `./fixtures/preset.ts`), data, 'utf8')
    expect(data).toMatchSnapshot()
  })
})
