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
        <View className='subtitle'>按钮类型</View>
        <View className='grid grid-cols-3 gap-2'>
          <Button className='btn'>默认按钮</Button>
          <Button className='btn btn-primary'>主要按钮</Button>
          <Button className='btn btn-success'>成功按钮</Button>
          <Button className='btn btn-warning'>警告按钮</Button>
          <Button className='btn btn-error'>错误按钮</Button>
          <Button className='btn btn-neutral'>中性按钮</Button>
        </View>
        <View className='subtitle'>朴素按钮</View>
        <View className='grid grid-cols-3 gap-2'>
          <Button className='btn btn-outline'>默认按钮</Button>
          <Button className='btn btn-outline btn-primary'>主要按钮</Button>
          <Button className='btn btn-outline btn-success'>成功按钮</Button>
          <Button className='btn btn-outline btn-warning'>警告按钮</Button>
          <Button className='btn btn-outline btn-error'>错误按钮</Button>
          <Button className='btn btn-outline btn-neutral'>中性按钮</Button>
        </View>
        <View className='subtitle'>禁用状态</View>
        <View className='grid grid-cols-3 gap-2'>
          <Button className='btn btn-disabled'>禁用状态</Button>
        </View>
        <View className='subtitle'>按钮尺寸</View>
        <View className='space-y-2'>
          <View className='grid grid-cols-2 gap-2'>
            <Button className='btn btn-xs'>btn-xs</Button>
            <Button className='btn btn-sm'>btn-sm</Button>
            <Button className='btn btn-md'>btn-md</Button>
            <Button className='btn btn-lg'>btn-lg</Button>
          </View>
          <View className='flex justify-center'>
            <Button className='btn btn-wide'>btn-wide</Button>
          </View>
          <View>
            <Button className='btn btn-block'>btn-block</Button>
          </View>
        </View>
      </View>
    )
  },
  alert: () => {
    return (
      <View>
        <View className='alert'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
        <View className='alert alert-primary'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
        <View className='alert alert-success'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
        <View className='alert alert-warning'>
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
