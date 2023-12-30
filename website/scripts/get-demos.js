const path = require('node:path')
const fs = require('node:fs')
const axios = require('axios')
const cheerio = require('cheerio')
const prettier = require('prettier')
const walk = require('klaw-sync')
const { resolveDemo, demosDir } = require('./dirs')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})

const dirs = walk(demosDir, {
  depthLimit: 0,
  nofile: true
})

const componentsArray = dirs.map((x) => {
  return path.basename(x.path)
})

function makeAAA({ title, html }) {
  return `### ${title}

<CodeRender code={\`
${html}
\`} />
  
\`\`\`html
${html}
\`\`\``
}

async function main() {
  for (const name of componentsArray) {
    const res = await axios.default.get(process.env.C_URI + name)
    const m = cheerio.load(res.data)
    const html = m('body .drawer-content .prose').html()
    const $ = cheerio.load(html)
    const result = []
    $('.component-preview').each(function (i, elem) {
      const daole = $(this)
      const text = daole.find('.component-preview-title').text()
      const dom = daole.find('.preview')
      dom.children('[data-svelte-h]').removeAttr('data-svelte-h')
      dom.children('img').attr('src', '/pig.jpg')
      const html = dom.html()
      result.push({
        title: text,
        html
      })
    })
    for (const xxx of result) {
      xxx.html = await prettier.format(xxx.html, {
        parser: 'html',
        tabWidth: 2,
        htmlWhitespaceSensitivity: 'ignore',
        printWidth: 100
      })
    }

    fs.writeFileSync(
      resolveDemo(name, 'base.mdx'),
      `import CodeRender from '../../CodeRender'

${result.map((x) => makeAAA(x)).join('\n')}   

    `,
      'utf8'
    )
    console.log(name + ' finished!')
  }
  console.log('finished!')
}

main()
