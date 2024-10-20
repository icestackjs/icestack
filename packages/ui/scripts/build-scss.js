const { createContext } = require('../')

async function main() {
  const ctx = createContext({
    clean: true,
  })
  await ctx.build()
}

main()
