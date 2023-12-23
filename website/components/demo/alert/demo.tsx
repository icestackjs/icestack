// import fs from 'node:fs'
// import path from 'node:path'
// import reactElementToJSXString from 'react-element-to-jsx-string'
// import parse from 'html-react-parser'
// import { render } from 'preact-render-to-string'
// import md from './index.mdc?raw'

function matchAll(regex: RegExp, str: string) {
  const array: RegExpExecArray[] = []
  let arr: RegExpExecArray
  while ((arr = regex.exec(str)) !== null) {
    array.push(arr)
  }
  return array
}

export default function Index() {
  const regex = /```html(.*?)```/gms
  const mdRaw: string = `\`\`\`html
  <div role="alert" class="alert">
    <i class="i-mdi-info-outline"></i>
    <span>12 unread messages. Tap to see.</span>
  </div>
  \`\`\``

  const arr = matchAll(regex, mdRaw)
  console.log(arr)
  return (
    <div>
      {arr.map((x, i) => {
        return <div key={i} dangerouslySetInnerHTML={{ __html: x[1] }}></div>
      })}
    </div>
  )
}
