import CodeRender from '@/components/CodeRender'
import { View } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className="subtitle">默认使用</View>
      <CodeRender className="">
        <View className="stack w-full">
          <View className="bg-primary text-primary-content grid h-20 place-content-center rounded">
            1
          </View>
          <View className="bg-success text-success-content grid h-20 place-content-center rounded">
            2
          </View>
          <View className="bg-warning text-warning-content grid h-20 place-content-center rounded">
            3
          </View>
        </View>
      </CodeRender>
    </View>
  )
}
