import { Tabs } from 'nextra/components'
import type { FC, PropsWithChildren, ReactElement } from 'react'
import { useMemo } from 'react'
import { groupBy, upperFirst } from 'lodash-es'
export const CodePreview: FC = (props: PropsWithChildren) => {
  const { children } = props

  const dic = useMemo(() => {
    let c = children
    if (!Array.isArray(c)) {
      c = [children]
    }
    return groupBy<ReactElement>(c as ReactElement[], (x) => {
      return x.props['data-language'] ?? 'preview'
    })
  }, [children])

  const tabItems = useMemo(() => {
    return Object.keys(dic).map((x) => upperFirst(x))
  }, [dic])

  return (
    <Tabs items={tabItems}>
      {dic.preview ? <Tabs.Tab>{dic.preview}</Tabs.Tab> : undefined}
      {dic.html ? <Tabs.Tab>{dic.html}</Tabs.Tab> : undefined}
      {dic.jsx ? <Tabs.Tab>{dic.jsx}</Tabs.Tab> : undefined}
    </Tabs>
  )
}
