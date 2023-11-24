import { View, Text, Button, ViewProps } from '@tarojs/components'
import MarkdownRender from '@/components/MarkdownRender'

export default () => {
  return (
    <View>
      <View className='subtitle'>颜色类型</View>

      <MarkdownRender>
        <View className='grid grid-cols-1 gap-2'>
          <View className='badge'>badge</View>
          <View className='badge badge-success'>badge-success</View>
          <View className='badge badge-warning'>badge-warning</View>
          <View className='badge badge-error'>badge-error</View>
          <View className='badge badge-neutral'>badge-neutral</View>
        </View>
      </MarkdownRender>
      <View className='subtitle'>朴素 outline</View>

      <MarkdownRender>
        <View className='grid grid-cols-1 gap-2'>
          <View className='badge badge-outline'>badge</View>
          <View className='badge badge-outline badge-success'>badge-success</View>
          <View className='badge badge-outline badge-warning'>badge-warning</View>
          <View className='badge badge-outline badge-error'>badge-error</View>
          <View className='badge badge-outline badge-neutral'>badge-neutral</View>
        </View>
      </MarkdownRender>
      <View className='subtitle'>尺寸</View>

      <MarkdownRender>
        <View className='grid grid-cols-1 gap-2'>
          <View className='badge badge-xs badge-success'>badge-xs</View>
          <View className='badge badge-sm badge-success'>badge-sm</View>
          <View className='badge badge-md badge-success'>badge-md</View>
          <View className='badge badge-lg badge-success'>badge-lg</View>
        </View>
      </MarkdownRender>
    </View>
  )
}
