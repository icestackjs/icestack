import { View, Text, Button, ViewProps } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className='subtitle'>默认使用</View>
      <View className='flex gap-1 items-center text-sm'>
        <View className='tooltip' data-tip='hello'>
          <Button className='btn'>Hover me</Button>
        </View>
      </View>
      <View className='subtitle'>尺寸</View>
    </View>
  )
}
