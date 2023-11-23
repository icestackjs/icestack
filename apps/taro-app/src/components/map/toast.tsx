import { View, Text, Button, ViewProps } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className='subtitle'>默认使用</View>
      <View className='flex gap-1 items-center text-sm'>
        <View className='toast'>
          <View className='alert alert-primary'>
            <View>你有一封新的邮件</View>
          </View>
        </View>
        <View className='toast toast-bottom toast-start'>
          <View className='alert alert-error'>
            <View>丢弃</View>
          </View>
        </View>
        <View className='toast toast-middle toast-center'>
          <View className='alert alert-success'>
            <View>邮件已送达</View>
          </View>
        </View>
        {/* <View className='toast toast-top toast-center'>
          <View className='alert alert-primary'>
            <View>你有一封新的邮件</View>
          </View>
        </View>
        <View className='toast toast-top toast-end'>
          <View className='alert alert-primary'>
            <View>你有一封新的邮件</View>
          </View>
        </View> */}
      </View>
    </View>
  )
}
