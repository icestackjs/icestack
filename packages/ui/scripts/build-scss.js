const { createContext } = require('../')
async function main() {
  const ctx = createContext()
  await ctx.build()
}

main()
