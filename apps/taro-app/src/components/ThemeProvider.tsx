import React, { PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { cx } from 'class-variance-authority'

export default function ThemeProvider(
  props: PropsWithChildren<{
    mode: 'light' | 'dark'
  }>
) {
  return (
    <View className={cx(props.mode)}>
      <View className='dark:bg-base-100'>{props.children}</View>
    </View>
  )
}
