import { View, Text, Button, ViewProps } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className='subtitle'>颜色类型</View>
      <View className='grid grid-cols-1 gap-2'>
        <View className='badge'>badge</View>
        <View className='badge badge-success'>badge-success</View>
        <View className='badge badge-warning'>badge-warning</View>
        <View className='badge badge-error'>badge-error</View>
        <View className='badge badge-neutral'>badge-neutral</View>
      </View>
      <View className='subtitle'>朴素 outline</View>
      <View className='grid grid-cols-1 gap-2'>
        <View className='badge badge-outline'>badge</View>
        <View className='badge badge-outline badge-success'>badge-success</View>
        <View className='badge badge-outline badge-warning'>badge-warning</View>
        <View className='badge badge-outline badge-error'>badge-error</View>
        <View className='badge badge-outline badge-neutral'>badge-neutral</View>
      </View>
      <View className='subtitle'>尺寸</View>
      <View className='grid grid-cols-1 gap-2'>
        <View className='badge badge-xs'>badge-xs</View>
        <View className='badge badge-sm'>badge-sm</View>
        <View className='badge badge-md'>badge-md</View>
        <View className='badge badge-lg'>badge-lg</View>
      </View>
    </View>
  )
}
