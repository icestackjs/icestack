import { View, Text, Button, ViewProps } from '@tarojs/components'
// import { useLoad } from '@tarojs/taro'
import React, { useState, useMemo } from 'react'
import './index.scss'
import { upperFirst } from 'lodash-es'
import ThemeProvider from '@/components/ThemeProvider'
import Taro, { useLoad } from '@tarojs/taro'

const map = {
  button: () => {
    return (
      <View>
        <View className='ice-subtitle'>按钮类型</View>
      </View>
    )
  },
  alert: () => {
    return (
      <View>
        <View className='ice-alert'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
        <View className='ice-alert ice-alert-primary'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
        <View className='ice-alert ice-alert-success'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
        <View className='ice-alert ice-alert-warning'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
      </View>
    )
  }
}

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
