import { View, Text, Slider } from '@tarojs/components'
import './range.scss'

export default () => {
  return (
    <View>
      <View className='subtitle'>微信平台默认样式</View>
      <View className='grid grid-cols-1 gap-2'>
        <Slider></Slider>
      </View>
      <View className='subtitle'>颜色类型</View>
      <View className='grid grid-cols-1 gap-2'>
        <Slider className='range'></Slider>
        <Slider className='range range-primary'></Slider>
        <Slider className='range range-success'></Slider>
        <Slider className='range range-warning'></Slider>
        <Slider className='range range-error'></Slider>
        <Slider className='range range-neutral'></Slider>
      </View>
      <View className='subtitle'>尺寸</View>
      <View className='grid grid-cols-1 gap-2'>
        <Slider className='range range-xs'></Slider>
        <Slider className='range range-sm'></Slider>
        <Slider className='range range-md'></Slider>
        <Slider className='range range-lg'></Slider>
      </View>
    </View>
  )
}
