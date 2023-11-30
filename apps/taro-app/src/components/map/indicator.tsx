import { View, Text, Button, ViewProps } from '@tarojs/components'
import CodeRender from '@/components/CodeRender'

export default () => {
  return (
    <View>
      <View className="subtitle">普通使用</View>

      <CodeRender>
        <View className="indicator">
          <Text className="indicator-item badge badge-primary"></Text>
          <View className="grid h-32 w-32 place-items-center bg-gray-300">
            content
          </View>
        </View>
      </CodeRender>
      <View className="subtitle">普通使用</View>
      <CodeRender>
        <View className="indicator">
          <Text className="indicator-item badge badge-primary">99+</Text>
          <Button className="btn">未读消息</Button>
        </View>
      </CodeRender>

      <View className="subtitle">方向</View>
      <CodeRender className="grid grid-cols-3 gap-2 place-items-center">
        <View className="indicator">
          <Text className="indicator-item indicator-start badge badge-primary">
            99+
          </Text>
          <Button className="btn">start</Button>
        </View>
        <View className="indicator">
          <Text className="indicator-item indicator-center badge badge-primary">
            99+
          </Text>
          <Button className="btn">center</Button>
        </View>
        <View className="indicator">
          <Text className="indicator-item indicator-end badge badge-primary">
            99+
          </Text>
          <Button className="btn">end</Button>
        </View>
        <View className="indicator">
          <Text className="indicator-item indicator-top indicator-start badge badge-primary">
            99+
          </Text>
          <Button className="btn">top</Button>
        </View>
        <View className="indicator">
          <Text className="indicator-item indicator-middle badge badge-primary">
            99+
          </Text>
          <Button className="btn">middle</Button>
        </View>
        <View className="indicator">
          <Text className="indicator-item indicator-bottom badge badge-primary">
            99+
          </Text>
          <Button className="btn">bottom</Button>
        </View>
      </CodeRender>
    </View>
  )
}
