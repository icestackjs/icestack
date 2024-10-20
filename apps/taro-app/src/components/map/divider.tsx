import CodeRender from '@/components/CodeRender'
import { View } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className="subtitle">颜色类型</View>

      <CodeRender className="grid grid-cols-1 gap-2">
        <View className="divider">Default</View>
        <View className="divider divider-primary">Primary</View>
        <View className="divider divider-success">Success</View>
        <View className="divider divider-warning">Warning</View>
        <View className="divider divider-error">Error</View>
        <View className="divider divider-neutral">Neutral</View>
      </CodeRender>

      <View className="subtitle">位置</View>

      <CodeRender className="grid grid-cols-1 gap-2">
        <View className="divider divider-start">Start</View>
        <View className="divider">Default</View>
        <View className="divider divider-end">End</View>
      </CodeRender>
    </View>
  )
}
