// import reactElementToJSXString from 'react-element-to-jsx-string'
import { PropsWithChildren } from 'react'
// import { trim } from 'lodash-es'
import parse from 'html-react-parser'
// function matchAll(regex: RegExp, str: string) {
//   const array: RegExpExecArray[] = []
//   let arr: RegExpExecArray
//   while ((arr = regex.exec(str)) !== null) {
//     array.push(arr)
//   }
//   return array
// }
// code ?? (
//   <div dangerouslySetInnerHTML={{ __html: '\n<div>12</div>\n' }}>
//     {/* {arr.map((x, i) => {
//     return <div key={i} dangerouslySetInnerHTML={{ __html: x[1] }}></div>
//   })} */}
//   </div>
// )

// const regex = /```html(.*?)```/gms
// const mdRaw: string = props.code //  reactElementToJSXString(props.children)
// console.log(mdRaw)
// const arr = matchAll(regex, mdRaw)
// const XXX =
export default function Index({ code }: PropsWithChildren<{ code?: string }>) {
  return parse(code)
}
