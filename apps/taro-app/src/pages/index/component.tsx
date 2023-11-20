import { View, Text, Button, ViewProps } from '@tarojs/components'
// import { useLoad } from '@tarojs/taro'
import React, { useState, useMemo } from 'react'
import './index.scss'
import Taro, { useLoad } from '@tarojs/taro'
import { upperFirst } from 'lodash-es'
import ThemeProvider from '@/components/ThemeProvider'
import map from '@/components/map'

export default function Index() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [com, setCom] = useState('')
  useLoad<{ id: string }>((params) => {
    if (params.id) {
      Taro.setNavigationBarTitle({
        title: upperFirst(params.id)
      })
      setCom(params.id)
    }
  })
  const TargetCom = useMemo(() => {
    return map[com]
  }, [com])
  return (
    <ThemeProvider mode={mode}>
      <View className='px-4'>{TargetCom && <TargetCom></TargetCom>}</View>
    </ThemeProvider>
  )
}
