import { View } from '@tarojs/components'
import { FC } from 'react'
import './Tabbar.scss'
import SafeBottom from './SafeBottom'
import { useIndexTabbar } from '@/store/index'
import { cx } from 'class-variance-authority'

const Tabbar: FC = () => {
  const { index, setIndex } = useIndexTabbar()
  const list = [
    {
      icon: 'i-mdi-document',
      text: 'Docs'
    },
    {
      icon: 'i-mdi-code-array',
      text: 'Code'
    }
  ]
  return (
    <>
      <View className="tabbar tabbar-border tabbar-fixed tabbar-safe bg-slate-50 before:border-slate-200 dark:bg-slate-800 dark:before:border-slate-900">
        <View className="flex w-full items-center py-2">
          {list.map(({ text, icon }, idx) => {
            const isActive = index === idx
            return (
              <View
                key={text}
                className="relative flex h-full w-1/2 items-center justify-center"
                onClick={() => {
                  setIndex(idx)
                }}
              >
                <View
                  className={cx({
                    'rounded-md bg-sky-300/[0.15] px-12 py-2 text-sky-500 dark:text-sky-400':
                      isActive
                  })}
                >
                  <View className={cx('flex items-center')}>
                    <View className={cx(icon)}></View>
                    <View className="ml-1 text-sm">{text}</View>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>

      <SafeBottom className="py-12 w-full"></SafeBottom>
    </>
  )
}

export default Tabbar
