import { generate } from '@/generate'

const outSideLayerCss = process.argv.slice(2)[0] as 'base' | 'utilities' | 'components'

async function main() {
  await generate({
    outSideLayerCss
  })
}

main()
