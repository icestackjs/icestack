import { View, Text, Button, ViewProps } from '@tarojs/components'
// import { useLoad } from '@tarojs/taro'
import React, { useState } from 'react'
import './index.scss'
import ThemeProvider from '../../components/ThemeProvider'

export default function Index() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  return (
    <ThemeProvider mode={mode}>
      <View className='h-screen'>
        <Button
          className='btn'
          onClick={() => {
            setMode((x) => {
              return x === 'dark' ? 'light' : 'dark'
            })
          }}
        >
          default
        </Button>
        <Button className='btn btn-primary'>primary</Button>
      </View>
    </ThemeProvider>
  )
}
