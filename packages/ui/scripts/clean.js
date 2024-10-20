// import path from 'node:path'
const path = require('node:path')

async function main() {
  const { deleteAsync } = await import('del')
  const res = await deleteAsync(
    ['css', 'js', 'css-resolved'].map((x) => {
      return path.resolve(__dirname, '..', `assets/${x}`)
    }),
    {
      force: true,
    },
  )
  console.log(res)
}

main()
