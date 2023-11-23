import { View, Text, Button, ViewProps } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className='subtitle'>默认使用</View>
      <View className='grid grid-cols-3 gap-2'>
        <View className='radial-progress' style='--value:0;' role='progressbar'>
          0%
        </View>
        <View className='radial-progress' style='--value:20;' role='progressbar'>
          20%
        </View>
        <View className='radial-progress' style='--value:60;' role='progressbar'>
          60%
        </View>
        <View className='radial-progress' style='--value:80;' role='progressbar'>
          80%
        </View>
        <View className='radial-progress' style='--value:100;' role='progressbar'>
          100%
        </View>
      </View>
      <View className='subtitle'>更改颜色</View>
      <View className='grid grid-cols-2 gap-2'>
        <View className='radial-progress text-pink-400' style='--value:20;' role='progressbar'>
          20%
        </View>
        <View className='radial-progress bg-pink-400 text-sky-400 border-pink-400 border-8' style='--value:60;' role='progressbar'>
          60%
        </View>
      </View>
      <View className='subtitle'>更改大小</View>
      <View className='grid grid-cols-2 gap-2'>
        <View className='radial-progress' style='--value:80;--size:10rem;--thickness:2rem' role='progressbar'>
          80%
        </View>
        <View className='radial-progress' style='--value:100;--thickness: 1px;' role='progressbar'>
          100%
        </View>
      </View>
    </View>
  )
}
