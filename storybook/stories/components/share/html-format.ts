// import { parseFragment, serializeOuter } from 'parse5'
import jb from 'js-beautify'
export function formatHtml(value: string) {
  return jb.html_beautify(value, {
    indent_size: 2
  })
  // const doc = parseFragment(value)
  // return serializeOuter(doc)
}
