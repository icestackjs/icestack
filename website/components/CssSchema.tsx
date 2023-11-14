import { componentsMap, componentsNames } from '@icestack/ui/components'
import { getDefaultBase, defaultSelectorMap } from '@icestack/ui/defaults'
import { FC, useEffect, useMemo, useState } from 'react'
// import { bundledLanguages, bundledThemes, getHighlighter } from 'shikiji'
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter'
import jb from 'js-beautify'
import serialize from 'serialize-javascript'

export function format(value: string) {
  return jb.js_beautify(value, {
    indent_size: 2,
    end_with_newline: true
  })
}

// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
const defaultBase = getDefaultBase()
const types = Object.keys(defaultBase.types)
const Com: FC<{ name: string }> = ({ name }) => {
  const [style, setStyle] = useState({})
  useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism/material-dark').then((mod) => setStyle(mod.default))
  })
  if (name in componentsMap) {
    const p = componentsMap[name].options({
      selector: defaultSelectorMap[name].selector,
      types
    })
    const codeString = format(serialize(p))
    return (
      <>
        <pre>
          <code className="language-javascript">backtick.fences('for blocks')</code>
        </pre>
      </>
      // <ReactSyntaxHighlighter language="javascript" style={style}>
      //   {codeString}
      // </ReactSyntaxHighlighter>
    )
  }
  return <div></div>
}

export default Com
