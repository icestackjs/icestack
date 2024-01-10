import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import { endsWith } from 'lodash'
import type { RollupOutput, OutputAsset } from 'rollup'
import plugin from '@/vite'

function endWithCss(filename: string) {
  return endsWith(filename, '.css')
}

function getCss(res: RollupOutput | RollupOutput[] | RollupWatcher) {
  const xxx = res as RollupOutput
  const css =
    Array.isArray(xxx.output) &&
    xxx.output
      .filter((x) => {
        return x.type === 'asset' && endWithCss(x.fileName)
      })
      .map((x) => {
        return (x as OutputAsset).source
      })
      .join('\n')
  return css
}

// const __dirname = fileURLToPath(new URL('.', import.meta.url))

describe('vite', () => {
  it('import js', async () => {
    const res = await build({
      root: path.resolve(__dirname, './vite-app'),
      build: {
        modulePreload: false
      },
      plugins: [plugin()]
    })

    expect(getCss(res)).toMatchSnapshot()
  })

  it('import css', async () => {
    const res = await build({
      root: path.resolve(__dirname, './vite-import-css-app'),
      build: {
        modulePreload: false
      },
      plugins: [plugin()]
    })

    expect(getCss(res)).toMatchSnapshot()
  })
})
