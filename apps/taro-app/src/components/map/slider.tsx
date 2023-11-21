import { View, Text, Slider } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className='subtitle'>颜色类型</View>
      <View className='grid grid-cols-1 gap-2'>
        <Slider></Slider>
      </View>
      <View className='subtitle'>尺寸</View>
      <View className='grid grid-cols-1 gap-2'>
        <Slider></Slider>
      </View>
    </View>
  )
}
