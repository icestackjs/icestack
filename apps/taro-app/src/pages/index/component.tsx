import { View, Text, Button, ViewProps } from '@tarojs/components'
// import { useLoad } from '@tarojs/taro'
import React, { useState } from 'react'
import './index.scss'
import ThemeProvider from '../../components/ThemeProvider'
import Taro, { useLoad } from '@tarojs/taro'

const map = {
  alert: (
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

export default function Index() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [com, setCom] = useState('')
  useLoad<{ id: string }>((params) => {
    if (params.id) {
      Taro.setNavigationBarTitle({
        title: params.id
      })
      setCom(params.id)
    }
  })
  const TargetCom = map[com]
  return <ThemeProvider mode={mode}>{TargetCom}</ThemeProvider>
}
