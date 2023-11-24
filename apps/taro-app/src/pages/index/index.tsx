import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { upperFirst } from 'lodash-es'
import { ReactNode, useState } from 'react'
import './index.scss'
import ThemeProvider from '@/components/ThemeProvider'
import { group, i18n } from '../../group'
import ThemeButton from '@/components/ThemeButton'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomeTitle from '@/components/HomeTitle'

const aliasMap = {
  range: 'Slider',
  toggle: 'Switch'
}

function getAlias(componentName: string) {
  const x = aliasMap[componentName]
  if (x) {
    return '/' + x
  }
  return ''
}

export default function Index() {
  return (
    <ThemeProvider>
      <Navbar>
        <View
          className='text-center h-full flex pl-4 items-center text-lg'
          onClick={() => {
            Taro.setClipboardData({
              data: 'https://github.com/sonofmagic/icestack'
            })
          }}
        >
          <View className='rounded-md border border-solid border-[rgba(31,35,40,0.15)] bg-[rgb(246,248,250)] dark:border-[rgba(205,217,229,0.1)] dark:bg-[rgb(55,62,71)] flex items-center px-2 py-1'>
            <View className='i-mdi-github'></View>
            <View className='text-slate-900 dark:text-white mx-0.5 i-mdi-add'></View>
            <View className='i-mdi-star text-[#daaa3f]'></View>
          </View>
        </View>
      </Navbar>
      <View className='min-h-screen px-5 pt-2 pb-3'>
        <View className='px-4'>
          <HomeTitle />
          <View className='text-slate-600 dark:text-slate-400 text-sm mb-1 text-center'>灵活自由的开源CSS Component生成器</View>

          {/* <md markdown content={'```js\nconst y = \'1111\'\n```\n'}></md> */}
          {/* <View className='text-slate-500 dark:text-slate-300 text-xs mb-1'>tips: 本小程序由于大量使用了 grid 布局和 css 新特性，可能会出现部分机型不兼容的情况</View> */}
          {/* <View
            className='mb-4 text-xs text-slate-500 dark:text-slate-300'
            onClick={() => {
              Taro.setClipboardData({
                data: 'https://github.com/sonofmagic/icestack/tree/main/apps/taro-app'
              })
            }}
          >
            源代码地址:
            <View className='link link-primary'>sonofmagic/icestack/apps/taro-app</View>
          </View> */}
        </View>

        {Object.entries(group).reduce<ReactNode[]>((acc, [groupName, componentNames]) => {
          if (componentNames.length) {
            acc.push(<View className='text-slate-600 dark:text-slate-400 text-sm ml-4 mt-6 mb-2'>{i18n[groupName]}</View>)
            // space-y-3
            const res: ReactNode[] = []
            for (const componentName of componentNames) {
              if (['select', 'diff','tooltip'].includes(componentName)) {
                continue
              }
              res.push(
                <View
                  className='bg-gray-100 dark:bg-sky-300/[0.15] py-2.5 rounded-full pl-5 pr-3.5 flex justify-between items-center'
                  hoverClass='bg-gray-300/50 dark:bg-sky-500/50'
                  key={componentName}
                  onClick={() => {
                    Taro.navigateTo({
                      url: 'component?id=' + componentName
                    })
                  }}
                >
                  <View className='text-sm text-slate-700 dark:text-slate-400'>
                    {upperFirst(componentName)}
                    {getAlias(componentName)} {i18n[componentName]}
                  </View>
                  <View className='i-mdi-chevron-right text-slate-700 dark:text-slate-400'></View>
                </View>
              )
            }
            acc.push(<View className='space-y-3'>{res}</View>)
          }

          return acc
        }, [])}
      </View>
      <ThemeButton></ThemeButton>
      <Footer></Footer>
    </ThemeProvider>
  )
}
