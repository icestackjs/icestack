import { generate, buildAll } from '@/generate'
import { getCodegenOptions } from '@/options'
const outSideLayerCss = process.argv.slice(2)[0] as 'base' | 'utilities' | 'components'

function main() {
  if (outSideLayerCss) {
    generate({
      options: getCodegenOptions(),
      outSideLayerCss
    })
  } else {
    buildAll(getCodegenOptions())
  }
}

main()
