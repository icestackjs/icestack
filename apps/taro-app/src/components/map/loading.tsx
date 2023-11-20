import { View, Text, Button, ViewProps } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className='subtitle'>动画类型</View>
      <View className='grid grid-cols-3 gap-2'>
        <Button className='btn'>
          <View className='loading loading-sm'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-audio'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-ball-triangle'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-bars'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-circles'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-grid'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-hearts'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-oval'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-puff'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-rings'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-spinning-circles'></View>
        </Button>
        <Button className='btn'>
          <View className='loading loading-sm loading-three-dots'></View>
        </Button>
      </View>

      <View className='subtitle'>尺寸</View>
      <View className='space-y-2'>
        <View className='grid grid-cols-2 gap-2'>
          <View className='loading loading-xs'></View>
          <View className='loading loading-sm'></View>
          <View className='loading loading-md'></View>
          <View className='loading loading-lg'></View>
        </View>
      </View>
    </View>
  )
}
