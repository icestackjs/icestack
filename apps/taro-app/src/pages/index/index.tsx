import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { upperFirst } from 'lodash-es'
import { ReactNode, useState } from 'react'
import ThemeProvider from '@/components/ThemeProvider'
import { group, i18n } from '../../group'
import ThemeButton from '@/components/ThemeButton'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomeTitle from '@/components/HomeTitle'
import Tabbar from '@/components/Tabbar'
import { useIndexTabbar } from '@/store/index'
import { cx } from 'class-variance-authority'
import levelI18n from '#docs/_meta.zh-CN.json'
import level2Usage18n from '#docs/usage/_meta.zh-CN.json'
import level2Core18n from '#docs/core/_meta.zh-CN.json'

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

function DocsIndex() {
  return (
    <>
      <View className='px-4 mb-6'>
        <HomeTitle />
        <View className='text-slate-600 dark:text-slate-400 text-sm mb-1 text-center'>灵活自由的开源CSS Component生成器</View>
      </View>
      <View className='space-y-3'>
        {Object.entries(levelI18n).map(([x, text1]) => {
          return (
            <View key={x}>
              <View
                onClick={() => {
                  Taro.navigateTo({
                    url: 'doc?id=' + x
                  })
                }}
                className='bg-gray-100 dark:bg-sky-300/[0.15] py-2.5 rounded-full pl-5 pr-3.5 flex justify-between items-center'
                hoverClass='bg-gray-300/50 dark:bg-sky-500/50'
              >
                {text1}
              </View>
              {x === 'usage' && (
                <View className='space-y-1.5 mt-1.5'>
                  {Object.entries(level2Usage18n).map(([y, text2]) => {
                    return (
                      <View
                        key={y}
                        onClick={() => {
                          Taro.navigateTo({
                            url: 'doc?id=' + [x, y].join('.')
                          })
                        }}
                        className='bg-gray-100 dark:bg-sky-300/[0.15] py-1 text-sm rounded-full pl-5 pr-3.5 flex justify-between items-center'
                        hoverClass='bg-gray-300/50 dark:bg-sky-500/50'
                      >
                        {text2}
                      </View>
                    )
                  })}
                </View>
              )}
              {x === 'core' && (
                <View className='space-y-1.5 mt-1.5'>
                  {Object.entries(level2Core18n).map(([y, text2]) => {
                    return (
                      <View
                        key={y}
                        onClick={() => {
                          Taro.navigateTo({
                            url: 'doc?id=' + [x, y].join('.')
                          })
                        }}
                        className='bg-gray-100 dark:bg-sky-300/[0.15] py-1 text-sm rounded-full pl-5 pr-3.5 flex justify-between items-center'
                        hoverClass='bg-gray-300/50 dark:bg-sky-500/50'
                      >
                        {text2}
                      </View>
                    )
                  })}
                </View>
              )}
            </View>
          )
        })}
      </View>
    </>
  )
}

function CodeIndex() {
  return (
    <>
      {Object.entries(group).reduce<ReactNode[]>((acc, [groupName, componentNames], idx) => {
        if (componentNames.length) {
          acc.push(<View className={cx(idx === 0 ? '' : 'mt-6 ', 'text-slate-600 dark:text-slate-400 text-sm ml-4 mb-2')}>{i18n[groupName]}</View>)
          // space-y-3
          const res: ReactNode[] = []
          for (const componentName of componentNames) {
            if (['select', 'diff', 'tooltip'].includes(componentName)) {
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
    </>
  )
}

export default function Index() {
  const { index } = useIndexTabbar()
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
        {index === 0 && <DocsIndex></DocsIndex>}
        {index === 1 && <CodeIndex></CodeIndex>}
      </View>

      <Footer></Footer>
      <ThemeButton></ThemeButton>
      <Tabbar></Tabbar>
    </ThemeProvider>
  )
}
