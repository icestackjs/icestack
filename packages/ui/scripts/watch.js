const path = require('node:path')
const chokidar = require('chokidar')

chokidar
  .watch(path.resolve(__dirname, 'icestack.config.{js,ts,cjs}'))
  .on('change', () => {
    console.log('change')
  })
  .on('ready', () => {
    console.log('ready')
  })
