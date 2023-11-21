import { View, Text, Button, ViewProps } from '@tarojs/components'
import button from './button'
import loading from './loading'
import mask from './mask'
import link from './link'
import checkbox  from './checkbox'
import input from './input'
import radio from './radio'
import range from './range'

export default {
  button,
  loading,
  mask,
  link,
  checkbox,
  input,
  radio,
  range,
  alert: () => {
    return (
      <View>
        <View className='alert'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
        <View className='alert alert-primary'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
        <View className='alert alert-success'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
        <View className='alert alert-warning'>
          <Text className='i-mdi-information-outline w-6 h-6'></Text>
          <Text>默认alert</Text>
        </View>
      </View>
    )
  }
}
