import React, { PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { cx } from 'class-variance-authority'
import { useThemeStore } from '@/store/index'

export default function ThemeProvider(props: PropsWithChildren<{}>) {
  const { mode } = useThemeStore()
  return (
    <View className={cx(mode,'')}>
      <View className='antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 transition-colors duration-300 min-h-screen'>{props.children}</View>
    </View>
  )
}
