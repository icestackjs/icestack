const path = require('node:path')
const fs = require('node:fs')
const klaw = require('klaw')
const { translate } = require('bing-translate-api')

const HAN_REGEX = /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FD5\uF900-\uFA6D\uFA70-\uFAD9]/

function containsChinese(text) {
  if (text === null || text === undefined || text === '') {
    return false
  }

  if (typeof text !== 'string') text = text.toString()

  return HAN_REGEX.test(text)
}

async function main() {
  for await (const file of klaw(path.resolve(__dirname, '../pages/docs'))) {
    if (file.stats.isFile()) {
      if (/\.zh-CN\.mdx?$/.test(file.path)) {
        const content = fs.readFileSync(file.path, 'utf8')
        let res = content
        if (containsChinese(content)) {
          const intervalNumber = 1000
          if (content.length > intervalNumber) {
            const arr = []
            let start = 0
            let end = start + intervalNumber
            while (start < content.length) {
              const pt = content.slice(start, end).lastIndexOf('\n')
              const ttt = content.slice(start, pt)
              const rrr = await translate(ttt, 'zh-Hans', 'en')
              if (rrr) {
                arr.push(rrr.translation)
              } else {
                arr.push(ttt)
              }

              start = pt
              end = pt + intervalNumber
            }
            res = arr.join('\n')
          } else {
            const { translation } = await translate(content, 'zh-Hans', 'en')
            res = translation
          }
        }

        fs.writeFileSync(file.path.replace(/zh-CN/, 'en-US'), res, 'utf8')
      } else if (/\.zh-CN\.json$/.test(file.path)) {
        // console.log(file.path)
        const content = fs.readFileSync(file.path, 'utf8')
        const target = await Object.entries(JSON.parse(content)).reduce(async (acc, [k, v]) => {
          const x = await acc
          if (typeof v === 'string' && containsChinese(v)) {
            try {
              const { translation } = await translate(v, 'zh-Hans', 'en')
              x[k] = translation
            } catch {
              x[k] = v
            }
          } else {
            x[k] = v
          }

          return x
        }, {})

        fs.writeFileSync(file.path.replace(/zh-CN/, 'en-US'), JSON.stringify(target, null, 2), 'utf8')
      }
    }
  }
}

main()
