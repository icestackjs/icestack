import CodeRender from '@/components/CodeRender'
import { Button, Input, Text, View } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className="subtitle">默认使用</View>
      <CodeRender>
        <View className="join">
          <Button className="btn join-item">Button</Button>
          <Button className="btn join-item">Button</Button>
          <Button className="btn join-item">Button</Button>
        </View>
      </CodeRender>
      <View className="subtitle">垂直方向</View>
      <CodeRender>
        <View className="join join-vertical">
          <Button className="btn join-item">Button</Button>
          <Button className="btn join-item">Button</Button>
          <Button className="btn join-item">Button</Button>
        </View>
      </CodeRender>
      <View className="subtitle">其他元素</View>
      <CodeRender>
        <View className="join">
          <View className="join-item">
            <Input className="input input-bordered" placeholder="Search" />
          </View>
          <View className="indicator">
            <Text className="indicator-item badge-secondary badge">new</Text>
            <Button className="btn join-item">Search</Button>
          </View>
        </View>
      </CodeRender>
    </View>
  )
}
