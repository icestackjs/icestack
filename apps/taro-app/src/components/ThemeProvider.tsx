import type { PropsWithChildren } from 'react'
import { useThemeStore } from '@/store/index'
import { View } from '@tarojs/components'
import { cx } from 'class-variance-authority'
import React from 'react'

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
