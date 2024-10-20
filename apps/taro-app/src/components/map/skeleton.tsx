import CodeRender from '@/components/CodeRender'
import { View } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className="subtitle">类型</View>
      <View className="flex flex-col space-y-2 ">
        <View className="tips">skeleton-avatar</View>
        <CodeRender className="grid grid-cols-3 gap-2">
          <View className="skeleton skeleton-avatar"></View>
          <View className="skeleton skeleton-avatar rounded-none"></View>
          <View className="skeleton skeleton-avatar w-16 h-8"></View>
        </CodeRender>

        <View className="tips">skeleton-title</View>
        <CodeRender className="grid grid-cols-1 gap-y-2">
          <View className="skeleton skeleton-title w-1/4 h-4"></View>
          <View className="skeleton skeleton-title w-1/2 h-8"></View>
          <View className="skeleton skeleton-title w-3/4 h-12"></View>
        </CodeRender>

        <View className="tips">skeleton-paragraph</View>
        <View className="skeleton skeleton-paragraph"></View>
      </View>
      <View className="subtitle">组合使用</View>
      <CodeRender className="flex">
        <View className="skeleton skeleton-avatar mr-2"></View>
        <View className="space-y-2 flex-1">
          <View className="skeleton skeleton-title"></View>
          <View className="skeleton skeleton-paragraph"></View>
          <View className="skeleton skeleton-paragraph"></View>
          <View className="skeleton skeleton-paragraph"></View>
          <View className="skeleton skeleton-paragraph"></View>
        </View>
      </CodeRender>
      <View className="subtitle">取消闪烁动画</View>
      <CodeRender className="flex">
        <View className="skeleton skeleton-avatar no-animation mr-2"></View>
        <View className="space-y-2 flex-1">
          <View className="skeleton skeleton-paragraph no-animation"></View>
          <View className="skeleton skeleton-paragraph no-animation"></View>
          <View className="skeleton skeleton-paragraph no-animation"></View>
          <View className="skeleton skeleton-paragraph no-animation"></View>
        </View>
      </CodeRender>
    </View>
  )
}
