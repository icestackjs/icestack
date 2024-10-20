import type { FC, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useMemo } from 'react'

const Navbar: FC<PropsWithChildren> = ({ children }) => {
  const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight ?? 0
  const menu = Taro.getMenuButtonBoundingClientRect()
  const navBarHeight = (menu.top - statusBarHeight) * 2 + menu.height
  const pages = Taro.getCurrentPages()
  const hasNavigateBack = useMemo(() => {
    return pages.length > 1
  }, [pages])

  return (
    <View className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 transition-colors duration-300 sticky top-0 z-50">
      <View
        className="status-bar"
        style={{
          height: statusBarHeight,
        }}
      >
      </View>
      <View
        className="nav-bar relative text-slate-900 dark:text-white"
        style={{
          height: navBarHeight,
        }}
      >
        <View
          className="absolute flex items-center"
          style={{
            height: navBarHeight,
          }}
        >
          {hasNavigateBack && (
            <View
              className="flex items-center pl-4 h-full"
              onClick={() => {
                Taro.navigateBack()
              }}
            >
              <View className="i-mdi-chevron-left text-xl"></View>
              <View className="text-sm">返回</View>
            </View>
          )}
        </View>
        <View className="w-full h-full">{children}</View>
        <View></View>
      </View>
    </View>
  )
}

export default Navbar
