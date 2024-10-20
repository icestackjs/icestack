import type { FC, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { cx } from 'class-variance-authority'
import './SafeBottom.scss'

const SafeBottom: FC<
  PropsWithChildren<{
    className?: string
  }>
> = ({ className }) => {
  return <View className={cx(className, 'w-full safe-area-inset-bottom')}></View>
}

export default SafeBottom
