import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { upperFirst } from 'lodash-es'
import { ReactNode, useState } from 'react'
import './index.scss'
import ThemeProvider from '../../components/ThemeProvider'
import { group, i18n } from '../../group'

export default function Index() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  return (
    <ThemeProvider mode={mode}>
      <View className='min-h-screen px-5 pt-5 pb-5'>
        <View className='px-4'>
          <View className='text-3xl text-gray-700 mb-4'>@icestack/ui</View>
          <View className='text-gray-600 text-sm mb-2'>灵活自由的CSS组件生成器</View>
          <View
            className='mb-6 text-xs text-gray-500'
            onClick={() => {
              Taro.setClipboardData({
                data: 'https://github.com/sonofmagic/icestack/tree/main/apps/taro-app'
              })
            }}
          >
            源代码地址:
            <View className='link link-primary'>sonofmagic/icestack/tree/main/apps/taro-app</View>
          </View>
        </View>

        {Object.entries(group).reduce<ReactNode[]>((acc, [groupName, componentNames]) => {
          if (componentNames.length) {
            acc.push(<View className='text-gray-600 text-sm ml-4 mt-6 mb-2'>{i18n[groupName]}</View>)
            // space-y-3
            const res: ReactNode[] = []
            for (const componentName of componentNames) {
              res.push(
                <View
                  className='bg-gray-100 py-2.5 rounded-full pl-5 pr-3.5 flex justify-between items-center'
                  hoverClass='bg-gray-300/50'
                  key={componentName}
                  onClick={() => {
                    Taro.navigateTo({
                      url: 'component?id=' + componentName
                    })
                  }}
                >
                  <View className='text-sm text-gray-700'>
                    {upperFirst(componentName)} {i18n[componentName]}
                  </View>
                  <View className='i-mdi-chevron-right text-gray-500'></View>
                </View>
              )
            }
            acc.push(<View className='space-y-3'>{res}</View>)
          }

          return acc
        }, [])}
      </View>
    </ThemeProvider>
  )
}
