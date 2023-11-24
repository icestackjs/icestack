import { View, Text, Button, ViewProps } from '@tarojs/components'
import MarkdownRender from '@/components/MarkdownRender'

export default () => {
  return (
    <View>
      <View className='subtitle'>默认使用</View>
      <View className='grid grid-cols-3 gap-2'>
        <View className='radial-progress' style='--value:0;'>
          0%
        </View>
        <View className='radial-progress' style='--value:20;'>
          20%
        </View>
        <View className='radial-progress' style='--value:60;'>
          60%
        </View>
        <View className='radial-progress' style='--value:80;'>
          80%
        </View>
        <View className='radial-progress' style='--value:100;'>
          100%
        </View>
      </View>
      <MarkdownRender
        content={`<View className='radial-progress' style='--value:0;' >
          0%
        </View>
        <View className='radial-progress' style='--value:20;' >
          20%
        </View>
        <View className='radial-progress' style='--value:60;' >
          60%
        </View>
        <View className='radial-progress' style='--value:80;' >
          80%
        </View>
        <View className='radial-progress' style='--value:100;' >
          100%
        </View>`}
      ></MarkdownRender>
      <View className='subtitle'>更改颜色</View>
      <View className='grid grid-cols-2 gap-2'>
        <View className='radial-progress text-pink-400' style='--value:20;'>
          20%
        </View>
        <View className='radial-progress bg-pink-400 text-sky-400 border-pink-400 border-8' style='--value:60;'>
          60%
        </View>
      </View>
      <MarkdownRender
        content={`<View className='radial-progress text-pink-400' style='--value:20;'>
        20%
      </View>
      <View className='radial-progress bg-pink-400 text-sky-400 border-pink-400 border-8' style='--value:60;'>
        60%
      </View>`}
      ></MarkdownRender>
      <View className='subtitle'>更改大小</View>
      <View className='grid grid-cols-2 gap-2'>
        <View className='radial-progress' style='--value:80;--size:10rem;--thickness:2rem'>
          80%
        </View>
        <View className='radial-progress' style='--value:100;--thickness: 1px;'>
          100%
        </View>
      </View>
      <MarkdownRender
        content={`<View className='radial-progress' style='--value:80;--size:10rem;--thickness:2rem'>
        80%
      </View>
      <View className='radial-progress' style='--value:100;--thickness: 1px;'>
        100%
      </View>`}
      ></MarkdownRender>
    </View>
  )
}
