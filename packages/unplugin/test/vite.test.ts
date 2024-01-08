import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import plugin from '@/vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

describe('vite', () => {
  it('should ', async () => {
    const res = await build({
      root: path.resolve(__dirname, './vite-app'),
      build: {
        modulePreload: false
      },
      plugins: [plugin()]
    })
    // @ts-ignore
    expect(res.output[0].code).toMatchSnapshot()
  })
})
