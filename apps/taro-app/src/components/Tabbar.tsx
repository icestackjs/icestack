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
      <View className='tabbar tabbar-border tabbar-fixed tabbar-safe h-12 bg-slate-50 dark:bg-slate-800 before:border-slate-200 dark:before:border-slate-900'>
        {list.map(({ text, icon }, idx) => {
          const isActive = index === idx
          return (
            <View key={text} className='w-1/2 flex justify-center items-center relative h-full' onClick={()=>{
              setIndex(idx)
            }}
            >
              <View
                className={cx(
                  {
                    "text-sky-500 dark:text-sky-400 before:bg-sky-300/[0.15] before:rounded-md before:absolute before:content-[''] before:left-4 before:right-4 before:top-2 before:bottom-2": isActive
                  },
                  'flex items-center'
                )}
              >
                <View className={cx(icon)}></View>
                <View className='text-sm ml-1'>{text}</View>
              </View>
            </View>
          )
        })}
      </View>
      <SafeBottom className='h-12'></SafeBottom>
    </>
  )
}

export default Tabbar
