import React, { PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { cx } from 'class-variance-authority'
import { useThemeStore } from '@/store/index'

export default function ThemeProvider(
  props: PropsWithChildren<{
    mode?: 'light' | 'dark'
  }>
) {
  const { mode } = useThemeStore()
  return (
    <View className={cx(mode, props.mode)}>
      <View className='dark:bg-base-100'>{props.children}</View>
    </View>
  )
}
