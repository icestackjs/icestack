import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'
// const outSideLayerCss = process.argv.slice(2)[0] as 'base' | 'utilities' | 'components'

async function main() {
  const ctx = createContext(getCodegenOptions())
  await ctx.build()
}

main()
