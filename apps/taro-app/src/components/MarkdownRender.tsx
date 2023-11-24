import { FC, PropsWithChildren, useMemo } from 'react'
import dedent from 'dedent'
import reactElementToJSXString from 'react-element-to-jsx-string'

function makeCodeBlock(res: string, lang: string) {
  return '```' + (lang || '') + '\n' + res + '\n```'
}

const MarkdownRender: FC<
  PropsWithChildren<{
    content?: string
    codeBlock?: boolean
    lang?: string
  }>
> = ({ content, codeBlock = true, lang = 'html', children }) => {
  const innerContent = useMemo(() => {
    if (content) {
      let res = dedent(content)
      if (codeBlock) {
        res = makeCodeBlock(res, lang)
      }
      return res
    } else {
      const html = reactElementToJSXString(children).replace(/className/g, 'class')

      return makeCodeBlock(html, lang)
    }
  }, [children, codeBlock, content, lang])
  return (
    <>
      {children}
      <md markdown content={innerContent}></md>
    </>
  )
}

export default MarkdownRender
