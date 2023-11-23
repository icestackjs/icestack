import { View, Text, Button, ViewProps } from '@tarojs/components'
import { useEffect, useState } from 'react'

export default () => {
  const [value, setValue] = useState(60)
  useEffect(() => {
    const ptr = setInterval(() => {
      setValue((x) => {
        if (x <= 0) {
          return 99
        } else {
          return x - 1
        }
      })
    }, 1000)
    return () => {
      clearInterval(ptr)
    }
  }, [])
  return (
    <View>
      <View className='subtitle'>基础展示</View>
      <View className='grid grid-cols-1 gap-2'>
        <View className='countdown'>
          <View
            className='text-4xl'
            style={{
              '--value': value
            }}
          ></View>
        </View>
        <View className='countdown text-xs flex items-baseline gap-1'>
          <View
            className='text-xl '
            style={{
              '--value': value
            }}
          ></View>
          时
          <View
            className='text-xl '
            style={{
              '--value': value
            }}
          ></View>
          分
          <View
            className='text-xl '
            style={{
              '--value': value
            }}
          ></View>
          秒
        </View>
      </View>
    </View>
  )
}
