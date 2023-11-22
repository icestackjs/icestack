import { View, Text, Button, ViewProps } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className='subtitle'>类型</View>
      <View className='flex flex-col space-y-2 '>
        <View className='skeleton skeleton-avatar'></View>
        <View className='skeleton skeleton-title'></View>
        <View className='skeleton skeleton-paragraph'></View>
      </View>
      <View className='subtitle'>组合使用</View>
      <View className='flex'>
        <View className='skeleton skeleton-avatar mr-2'></View>
        <View className='space-y-2 flex-1'>
          <View className='skeleton skeleton-title'></View>
          <View className='skeleton skeleton-paragraph'></View>
          <View className='skeleton skeleton-paragraph'></View>
          <View className='skeleton skeleton-paragraph'></View>
          <View className='skeleton skeleton-paragraph'></View>
        </View>
      </View>
    </View>
  )
}
