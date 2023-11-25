import { View, Text, Button, ViewProps } from '@tarojs/components'
import CodeRender from '@/components/CodeRender'
import { useEffect, useState } from 'react'

export default () => {
  const [value, setValue] = useState(100)
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
      <View className='subtitle'>默认使用</View>
      <CodeRender className='grid grid-cols-3 gap-2'>
        <View
          className='radial-progress'
          style={{
            '--value': 100 - value
          }}
        >
          {100 - value}%
        </View>
        <View
          className='radial-progress text-sky-400'
          style={{
            '--value': 120 - value
          }}
        >
          {120 - value}%
        </View>
        <View
          className='radial-progress text-green-400'
          style={{
            '--value': 160 - value
          }}
        >
          {160 - value}%
        </View>
        <View
          className='radial-progress text-pink-400'
          style={{
            '--value': 180 - value
          }}
        >
          {180 - value}%
        </View>
        <View
          className='radial-progress text-orange-400'
          style={{
            '--value': value
          }}
        >
          {value}%
        </View>
      </CodeRender>

      <View className='subtitle'>更改颜色</View>
      <CodeRender className='grid grid-cols-2 gap-2'>
        <View className='radial-progress text-pink-400' style='--value:20;'>
          20%
        </View>
        <View className='radial-progress bg-pink-400 text-sky-400 border-pink-400 border-8' style='--value:60;'>
          60%
        </View>
      </CodeRender>

      <View className='subtitle'>更改大小</View>
      <CodeRender className='grid grid-cols-2 gap-2'>
        <View className='radial-progress' style='--value:80;--size:10rem;--thickness:2rem'>
          80%
        </View>
        <View className='radial-progress' style='--value:100;--thickness: 1px;'>
          100%
        </View>
      </CodeRender>
    </View>
  )
}
