import { View, Text, Button, ViewProps, Progress ,Icon} from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className='subtitle'>颜色类型</View>
      <View className='grid grid-cols-1 gap-2'>
        <View>
          <Progress percent={20} show-info stroke-width='10' />
        </View>
        <View className='flex justify-between items-center'>
          <Progress className='flex-1' percent={40} active stroke-width='10' />
          <Icon className='ml-2' type='cancel'></Icon>
        </View>
        <View>
          <Progress percent={60} show-info stroke-width='10' />
        </View>
        <View>
          <Progress border-radius='10' percent={80} color='#10AEFF' stroke-width='10' />
        </View>
      </View>
      {/* <View className='subtitle'>朴素 outline</View>
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
      </View> */}
    </View>
  )
}
