import { FC, PropsWithChildren, useMemo } from 'react'
import dedent from 'dedent'
import reactElementToJSXString from 'react-element-to-jsx-string'
import { View } from '@tarojs/components'

function makeCodeBlock(res: string, lang: string) {
  return '```' + (lang || '') + '\n' + res + '\n```'
}

const MarkdownRender: FC<
  PropsWithChildren<{
    content?: string
    codeBlock?: boolean
    lang?: string
    className?: string
  }>
> = ({ content, codeBlock = true, lang = 'html', children, className }) => {
  const innerContent = useMemo(() => {
    if (content) {
      let res = dedent(content)
      if (codeBlock) {
        res = makeCodeBlock(res, lang)
      }
      return res
    } else {
      if (Array.isArray(children)) {
        let htmls: string[] = []
        for (const child of children) {
          const html = reactElementToJSXString(child).replace(/className/g, 'class')
          htmls.push(html)
        }
        return makeCodeBlock(htmls.join('\n'), lang)
      } else {
        const html = reactElementToJSXString(children).replace(/className/g, 'class')

        return makeCodeBlock(html, lang)
      }
    }
  }, [children, codeBlock, content, lang])
  return (
    <>
      <View className={className}>{children}</View>
      <View>
        <md markdown content={innerContent}></md>
      </View>
    </>
  )
}

export default MarkdownRender
