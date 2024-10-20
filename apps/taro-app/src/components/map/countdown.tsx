import CodeRender from '@/components/CodeRender'
import { View } from '@tarojs/components'
import { useEffect, useState } from 'react'

export default () => {
  const [value, setValue] = useState(60)
  useEffect(() => {
    const ptr = setInterval(() => {
      setValue((x) => {
        if (x <= 0) {
          return 99
        }
        else {
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
      <View className="subtitle">基础展示</View>
      <CodeRender className="grid grid-cols-1 gap-2">
        <View className="countdown text-4xl">
          💣💥⌚️:
          <View
            style={{
              '--value': value,
            }}
          >
          </View>
          s
        </View>

        <View className="countdown text-xs flex items-center gap-1">
          <View
            className="text-xl"
            style={{
              '--value': 100 - value,
            }}
          >
          </View>
          -
          <View
            className="text-xl"
            style={{
              '--value': value,
            }}
          >
          </View>
          -
          <View
            className="text-xl"
            style={{
              '--value': 100 - value,
            }}
          >
          </View>
        </View>
      </CodeRender>
    </View>
  )
}
