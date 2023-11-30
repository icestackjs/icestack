import { View, Text, Button, ViewProps } from '@tarojs/components'
import CodeRender from '@/components/CodeRender'

export default () => {
  return (
    <View>
      <View className="subtitle">默认使用</View>
      <CodeRender className="">
        <View className="stack">
          <View className="bg-primary text-primary-content grid h-20 w-32 place-content-center rounded">
            1
          </View>
          <View className="bg-accent text-accent-content grid h-20 w-32 place-content-center rounded">
            2
          </View>
          <View className="bg-secondary text-secondary-content grid h-20 w-32 place-content-center rounded">
            3
          </View>
        </View>
      </CodeRender>
    </View>
  )
}
