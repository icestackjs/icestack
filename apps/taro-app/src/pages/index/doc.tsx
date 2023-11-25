import { View, Text, Button, ViewProps } from '@tarojs/components'

import ThemeProvider from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import ThemeButton from '@/components/ThemeButton'
import Taro, { useLoad } from '@tarojs/taro'
import { useMemo, useState } from 'react'
// https://webpack.js.org/guides/asset-modules/
import introduction from '#docs/introduction.zh-CN.mdx'
import contribute from '#docs/contribute.zh-CN.mdx'
import core from '#docs/core.zh-CN.mdx'
import options from '#docs/options.zh-CN.mdx'
import usage from '#docs/usage.zh-CN.mdx'
import levelI18n from '#docs/_meta.zh-CN.json'
import cli from '#docs/usage/cli.zh-CN.mdx'
import mp from '#docs/usage/mp.zh-CN.mdx'
import nodejs from '#docs/usage/nodejs.zh-CN.mdx'
import tailwindcss from '#docs/usage/tailwindcss.zh-CN.mdx'

import composeClass from '#docs/core/composeClass.zh-CN.mdx'
import extraComponent from '#docs/core/extraComponent.zh-CN.mdx'
import override from '#docs/core/override.zh-CN.mdx'
import preset from '#docs/core/preset.zh-CN.mdx'
import theme from '#docs/core/theme.zh-CN.mdx'
import variant from '#docs/core/variant.zh-CN.mdx'

const map = {
  introduction,
  usage,
  core,
  contribute,
  options
}

for (const [k, v] of Object.entries({
  cli,
  tailwindcss,
  nodejs,
  mp
})) {
  map[['usage', k].join('.')] = v
}

for (const [k, v] of Object.entries({
  variant,
  theme,
  override,
  preset,
  composeClass,
  extraComponent
})) {
  map[['core', k].join('.')] = v
}

export default function Index() {
  const [id, setId] = useState('')
  const title = useMemo(() => {
    const t = levelI18n[id] ?? ''
    t &&
      Taro.setNavigationBarTitle({
        title: t
      })
    return t
  }, [id])

  useLoad<{ id: string }>((params) => {
    if (params.id) {
      const t = params.id
      setId(t)
      console.log(t)
    }
  })
  const content = useMemo(() => {
    return map[id] ?? ''
  }, [id])
  return (
    <ThemeProvider>
      <Navbar>
        <View className="flex justify-center items-center h-full">{title}</View>
      </Navbar>
      <View className="px-4">
        <md markdown content={content}></md>
      </View>
      <ThemeButton></ThemeButton>
    </ThemeProvider>
  )
}
