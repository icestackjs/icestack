import { View, Text, Button, ViewProps } from '@tarojs/components'
import CodeRender from '@/components/CodeRender'
import { useState } from 'react'
export default () => {
  const [a, seta] = useState(false)
  const [idx, setIdx] = useState(-1)
  return (
    <View>
      <View className="subtitle">普通使用</View>
      <CodeRender>
        <View className={`collapse ${a ? 'collapse-open' : ''} bg-gray-200`}>
          <View
            className="collapse-title p-2 text-lg"
            onClick={() => {
              seta((x) => {
                return !x
              })
            }}
          >
            点我来切换显示和隐藏
          </View>
          <View className="collapse-content">
            <View className="p-2 pt-0">
              <View>content1</View>
            </View>
          </View>
        </View>
      </CodeRender>
      <View className="subtitle">手风琴(只能打开一个)</View>
      <CodeRender className="space-y-1">
        {[0, 1, 2].map((x) => {
          return (
            <View
              key={x}
              className={`collapse ${
                idx === x ? 'collapse-open' : ''
              } bg-gray-200`}
            >
              <View
                className="collapse-title p-2 text-lg"
                onClick={() => {
                  setIdx((y) => {
                    if(y === x){
                      return -1
                    }
                    return x
                  })
                }}
              >
                第{x}个切换显示和隐藏
              </View>
              <View className="collapse-content">
                <View className="p-2 pt-0">
                  <View>content{x}</View>
                </View>
              </View>
            </View>
          )
        })}
      </CodeRender>
    </View>
  )
}
