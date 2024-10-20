import map from '@/components/map'
import Navbar from '@/components/Navbar'
import ThemeButton from '@/components/ThemeButton'
import ThemeProvider from '@/components/ThemeProvider'
import { View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { upperFirst } from 'lodash-es'
// import { useLoad } from '@tarojs/taro'
import React, { useMemo, useState } from 'react'

export default function Index() {
  const [com, setCom] = useState('')
  const [title, setTitle] = useState('')
  useLoad<{ id: string }>((params) => {
    if (params.id) {
      const t = upperFirst(params.id)
      Taro.setNavigationBarTitle({
        title: t,
      })
      setTitle(t)
      setCom(params.id)
    }
  })
  const TargetCom = useMemo(() => {
    return map[com]
  }, [com])
  return (
    <ThemeProvider>
      <Navbar>
        <View className="flex h-full items-center justify-center">{title}</View>
      </Navbar>
      <View className="px-4">{TargetCom && <TargetCom></TargetCom>}</View>
      <ThemeButton></ThemeButton>
    </ThemeProvider>
  )
}
