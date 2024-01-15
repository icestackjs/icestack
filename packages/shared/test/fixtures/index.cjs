async function main() {
  const res = await import('./xxx.mjs')
  console.log(res)
}

module.exports = {
  base: require('./config.cjs')
}

main()
