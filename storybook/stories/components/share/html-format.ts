// import { parseFragment, serializeOuter } from 'parse5'
import jb from 'js-beautify'

export function formatHtml(value: string) {
  return jb.html_beautify(value, {
    indent_size: 2,
    end_with_newline: true,
    indent_body_inner_html: true,
    preserve_newlines: true,
    wrap_line_length: 70,
  })
}
