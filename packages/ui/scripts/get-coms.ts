import path from 'node:path'
import fs from 'node:fs/promises'
import dedent from 'dedent'
import { camelCase } from 'lodash'

async function main() {
  const list = await fs.readdir(path.resolve(__dirname, '../assets/scss/components'))
  await fs.writeFile(
    path.resolve(__dirname, '../src/allComponents.ts'),
    dedent`export default [\n${list
      .reduce<string[]>((acc, cur) => {
        if (!cur.startsWith('.')) {
          acc.push(`'${camelCase(path.basename(cur, '.scss'))}'`)
        }

        return acc
      }, [])
      .join(',\n')}\n] as const`,
    'utf8'
  )
}

main()
