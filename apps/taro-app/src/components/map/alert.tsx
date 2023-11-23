import { View, Text, Button, ViewProps } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className='subtitle'>颜色类型</View>
      <View className='grid grid-cols-1 gap-2'>
        <View className='alert'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
        <View className='alert alert-primary'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>alert-primary</Text>
        </View>
        <View className='alert alert-success'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>alert-success</Text>
        </View>
        <View className='alert alert-warning'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>alert-warning</Text>
        </View>
      </View>
    </View>
  )
}
