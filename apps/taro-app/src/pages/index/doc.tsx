import levelI18n from '#docs/_meta.zh-CN.json'

import contribute from '#docs/contribute.zh-CN.mdx'
import core from '#docs/core.zh-CN.mdx'
import level2Core18n from '#docs/core/_meta.zh-CN.json'
import composeClass from '#docs/core/composeClass.zh-CN.mdx'
import extraComponent from '#docs/core/extraComponent.zh-CN.mdx'
import override from '#docs/core/override.zh-CN.mdx'
import preset from '#docs/core/preset.zh-CN.mdx'
import theme from '#docs/core/theme.zh-CN.mdx'
import variant from '#docs/core/variant.zh-CN.mdx'
import Navbar from '@/components/Navbar'
import ThemeButton from '@/components/ThemeButton'
import ThemeProvider from '@/components/ThemeProvider'
import { Button, View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useMemo, useState } from 'react'
// https://webpack.js.org/guides/asset-modules/
import introduction from '#docs/introduction.zh-CN.mdx'
import options from '#docs/options.zh-CN.mdx'

import usage from '#docs/usage.zh-CN.mdx'
import level2Usage18n from '#docs/usage/_meta.zh-CN.json'
import cli from '#docs/usage/cli.zh-CN.mdx'
import mp from '#docs/usage/mp.zh-CN.mdx'
import nodejs from '#docs/usage/nodejs.zh-CN.mdx'
import tailwindcss from '#docs/usage/tailwindcss.zh-CN.mdx'

const map = {
  introduction,
  usage,
}
const langMap = {
  ...levelI18n,
}

for (const [k, v] of Object.entries({
  cli,
  tailwindcss,
  nodejs,
  mp,
})) {
  map[['usage', k].join('.')] = v
  langMap[['usage', k].join('.')] = level2Usage18n[k]
}
map.core = core
for (const [k, v] of Object.entries({
  variant,
  theme,
  override,
  preset,
  composeClass,
  extraComponent,
})) {
  map[['core', k].join('.')] = v
  langMap[['core', k].join('.')] = level2Core18n[k]
}
map.contribute = contribute
map.options = options

const kkkkkkks = Object.keys(map) // orderBy()

export default function Index() {
  const [id, setId] = useState('')
  const title = useMemo(() => {
    const t = langMap[id] ?? ''
    t
    && Taro.setNavigationBarTitle({
      title: t,
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

  const { next, prev } = useMemo(() => {
    // console.log(kkkkkkks, id)
    const idx = kkkkkkks.indexOf(id)
    let prev
    let next
    if (idx > -1) {
      prev = kkkkkkks[idx - 1]
      next = kkkkkkks[idx + 1]
    }

    return {
      current: id,
      prev,
      next,
    }
  }, [id])
  // console.log(current)

  function goPrev() {
    setId(prev)
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    })
  }

  function goNext() {
    setId(next)
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    })
  }
  return (
    <ThemeProvider>
      <Navbar>
        <View className="flex h-full items-center justify-center">{title}</View>
      </Navbar>
      <View className="px-4">
        <md markdown content={content}></md>
      </View>
      <View className="flex justify-between px-4 py-2">
        <View>
          {prev && (
            <Button onClick={goPrev} className="btn text-sm">
              <View className="i-mdi-arrow-left-bold"></View>
              {langMap[prev]}
            </Button>
          )}
        </View>
        <View>
          {next && (
            <Button onClick={goNext} className="btn btn-primary text-sm">
              {langMap[next]}
              {' '}
              <View className="i-mdi-arrow-right-bold"></View>
            </Button>
          )}
        </View>
      </View>
      <ThemeButton></ThemeButton>
    </ThemeProvider>
  )
}
