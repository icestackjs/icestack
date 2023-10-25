import { generate } from '@/generate'
import { getBuildOptions } from '@/options'
const outSideLayerCss = process.argv.slice(2)[0] as 'base' | 'utilities' | 'components'

async function main() {
  await generate({
    options: getBuildOptions(),
    outSideLayerCss
  })
}

main()
