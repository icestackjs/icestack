import { FC, PropsWithChildren, useMemo, useState } from 'react'
import dedent from 'dedent'
import reactElementToJSXString from 'react-element-to-jsx-string'
import { View } from '@tarojs/components'
import { cx } from 'class-variance-authority'

function makeCodeBlock(res: string, lang: string) {
  return '```' + (lang || '') + '\n' + res + '\n```'
}

const CodeRender: FC<
  PropsWithChildren<{
    content?: string
    codeBlock?: boolean
    lang?: string
    className?: string
    open?: boolean
  }>
> = ({ content, codeBlock = true, lang = 'html', children, className, open = false }) => {
  const [codeVisible, setCodeVisible] = useState(open)
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
      <View className='mt-4'>
        <View
          style={{
            display: codeVisible ? 'block' : 'none'
          }}
        >
          <md markdown content={innerContent}></md>
        </View>

        <View
          className='flex justify-center items-center rounded-md border border-solid border-[rgba(31,35,40,0.15)] bg-[rgb(246,248,250)] dark:border-[rgba(205,217,229,0.1)] dark:bg-[rgb(55,62,71)] px-2 py-1 text-slate-900 dark:text-white'
          onClick={() => {
            setCodeVisible((x) => {
              return !x
            })
          }}
        >
          <View className={cx(codeVisible ? 'i-mdi-chevron-double-up' : 'i-mdi-chevron-double-down', 'mr-2')}></View>
          <View className='text-sm'>{codeVisible ? '收起' : '展开'}代码</View>
          <View className='i-mdi-code ml-1'></View>
        </View>
      </View>
    </>
  )
}

export default CodeRender
