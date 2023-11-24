import { View, Text, Button, ViewProps } from '@tarojs/components'
import MarkdownRender from '@/components/MarkdownRender'

export default () => {
  return (
    <View>
      <View className='subtitle'>默认使用</View>
      <View className='flex gap-1 items-center text-sm'>
        玩游戏的时候按下
        <View className='kbd'>Alt</View> +<View className='kbd'>F4</View>
        可以立即获得胜利
      </View>
      <MarkdownRender content={`<View className='kbd'>Alt</View> +<View className='kbd'>F4</View>`}></MarkdownRender>
      <View className='subtitle'>尺寸</View>
      <View className='flex items-center justify-center gap-2'>
        <View className='kbd kbd-xs'>A</View>
        <View className='kbd kbd-sm'>S</View>
        <View className='kbd kbd-md'>D</View>
        <View className='kbd kbd-lg'>F</View>
      </View>
      <MarkdownRender content={`<View className='kbd kbd-xs'>A</View>
        <View className='kbd kbd-sm'>S</View>
        <View className='kbd kbd-md'>D</View>
        <View className='kbd kbd-lg'>F</View>`}
      ></MarkdownRender>
    </View>
  )
}
