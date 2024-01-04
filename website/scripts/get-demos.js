const path = require('node:path')
const fs = require('node:fs')
const axios = require('axios')
const cheerio = require('cheerio')
const prettier = require('prettier')
const { default: MagicString } = require('magic-string')
const walk = require('klaw-sync')
const { resolveDemo, demosDir, resolveUnocssVueDir } = require('./dirs')

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
  //
  for (const name of componentsArray) {
    const res = await axios.default.get('http://localhost:3000/components/' + name)
    const m = cheerio.load(res.data)
    const html = m('body .drawer-content .prose').html()
    const $ = cheerio.load(html)
    const result = []
    $('.component-preview').each(function (i, elem) {
      const daole = $(this)
      const text = daole.find('.component-preview-title').text()
      const dom = daole.find('.preview')
      // dom.children('[data-svelte-h]').removeAttr('data-svelte-h')
      // dom.children('img').attr('src', '/pig.jpg')
      const html = new MagicString(dom.html())
      html.replaceAll(/data-svelte-h="[\w-]+"/g, '')
      html.replaceAll('daisyUI', 'IceStack')
      html.replaceAll(/src=\/[\w/]*/g, '/pig.jpg')
      result.push({
        title: text,
        html: html.toString()
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
    const vueCode = await prettier.format(
      `<script setup lang="ts">

    </script>
    
    <template>
    ${result.map((x) => x.html).join('\n')}   
    </template>
    `,
      {
        parser: 'vue',
        tabWidth: 2,
        htmlWhitespaceSensitivity: 'ignore',
        printWidth: 100
      }
    )
    fs.writeFileSync(resolveUnocssVueDir(name + '.vue'), vueCode, 'utf8')
    console.log(name + ' finished!')
  }

  console.log('finished!')
}

main().catch((error) => {
  console.error(error)
})
