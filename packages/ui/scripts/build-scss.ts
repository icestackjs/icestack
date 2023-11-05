import { buildAll } from '@/generate'
import { getCodegenOptions } from '@/options'
const outSideLayerCss = process.argv.slice(2)[0] as 'base' | 'utilities' | 'components'

function main() {
  buildAll(getCodegenOptions())
}

main()
