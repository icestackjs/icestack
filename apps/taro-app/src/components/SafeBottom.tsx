import { View } from '@tarojs/components'
import './SafeBottom.scss'
import { FC, PropsWithChildren } from 'react'
import { cx } from 'class-variance-authority'

const SafeBottom: FC<
  PropsWithChildren<{
    className?: string
  }>
> = ({ className }) => {
  return <View className={cx(className, 'w-full safe-area-inset-bottom')}></View>
}

export default SafeBottom
