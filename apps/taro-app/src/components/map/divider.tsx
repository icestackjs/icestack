import { View, Text, Button, ViewProps } from '@tarojs/components'
import CodeRender from '@/components/CodeRender'

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
