import { FC, PropsWithChildren, useMemo } from 'react'
import dedent from 'dedent';

const MarkdownRender: FC<
  PropsWithChildren<{
    content: string
    codeBlock?: boolean
    lang?: string
  }>
> = ({ content, codeBlock = true, lang = 'jsx' }) => {
  const innerContent = useMemo(() => {
    let res = dedent(content)
    if (codeBlock) {
      res = '```' + (lang || '') + '\n' + res + '\n```'
    }
    return res
  }, [codeBlock, content, lang])
  return <md markdown content={innerContent}></md>
}

export default MarkdownRender
