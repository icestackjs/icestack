import React, { PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { cx } from 'class-variance-authority'
import { useThemeStore } from '@/store/index'

export default function ThemeProvider(props: PropsWithChildren<{}>) {
  const { mode } = useThemeStore()
  return (
    <View className={cx(mode, '')}>
      <View className="min-h-screen bg-white text-slate-500 antialiased transition-colors duration-300 dark:bg-slate-900 dark:text-slate-400">
        {props.children}
      </View>
    </View>
  )
}
