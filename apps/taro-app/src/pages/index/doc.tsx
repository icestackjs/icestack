import { View, Text, Button, ViewProps } from '@tarojs/components'

import ThemeProvider from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import ThemeButton from '@/components/ThemeButton'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'

export default function Index() {
  const [title, setTitle] = useState('')
  useLoad<{ id: string }>((params) => {
    if (params.id) {
      const t = params.id
      Taro.setNavigationBarTitle({
        title: t
      })
      setTitle(t)
    }
  })
  return (
    <ThemeProvider>
      <Navbar>
        <View className='flex justify-center items-center h-full'>{title}</View>
      </Navbar>
      <View className='px-4'>
        <md markdown content='你好啊'></md>
      </View>
      <ThemeButton></ThemeButton>
    </ThemeProvider>
  )
}
