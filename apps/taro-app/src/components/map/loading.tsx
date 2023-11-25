import { View, Text, Button, ViewProps } from '@tarojs/components'
import CodeRender from '@/components/CodeRender'

export default () => {
  return (
    <View>
      <View className='subtitle'>动画类型</View>
      <CodeRender className='grid grid-cols-4 gap-2 place-items-center'>
        <View className='loading loading-sm'></View>

        <View className='loading loading-sm loading-audio'></View>

        <View className='loading loading-sm loading-ball-triangle'></View>

        <View className='loading loading-sm loading-bars'></View>

        <View className='loading loading-sm loading-circles'></View>

        <View className='loading loading-sm loading-grid'></View>

        <View className='loading loading-lg loading-hearts text-pink-400'></View>

        <View className='loading loading-sm loading-oval'></View>

        <View className='loading loading-sm loading-puff'></View>

        <View className='loading loading-sm loading-rings'></View>

        <View className='loading loading-sm loading-spinning-circles'></View>

        <View className='loading loading-sm loading-three-dots'></View>
      </CodeRender>

      <View className='subtitle'>尺寸</View>
      <View className='space-y-2'>
        <CodeRender className='grid grid-cols-2 gap-2 place-items-center'>
          <View className='loading loading-xs text-green-400'></View>
          <View className='loading loading-sm text-orange-400'></View>
          <View className='loading loading-md text-red-400'></View>
          <View className='loading loading-lg text-blue-400'></View>
        </CodeRender>
      </View>
    </View>
  )
}
