import { View } from '@tarojs/components'
// import { useLoad } from '@tarojs/taro'
import React, { ReactNode, useState } from 'react'
import './index.scss'
import ThemeProvider from '../../components/ThemeProvider'
import { componentsNames } from '@icestack/ui/components'
import { cx } from 'class-variance-authority'
import Taro from '@tarojs/taro'

export default function Index() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  return (
    <ThemeProvider mode={mode}>
      <View className='min-h-screen space-y-4 mx-8'>
        {allComs.reduce<ReactNode[]>((acc, x) => {
          acc.push(
            <View
              className='bg-gray-200 py-2 rounded-full px-4'
              hoverClass='bg-gray-400/50'
              key={x}
              onClick={() => {
                Taro.navigateTo({
                  url: 'component?id=' + x
                })
              }}
            >
              {x}
            </View>
          )
          return acc
        }, [])}
      </View>
    </ThemeProvider>
  )
}
