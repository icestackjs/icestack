import { View, Text, Button, ViewProps, Checkbox, Label } from '@tarojs/components'
// import './checkbox.scss'

export default () => {
  return (
    <View>
      <View>
        <View className='subtitle'>微信平台组件默认样式</View>
        <View className='grid grid-cols-3'>
          <View>
            <Checkbox value='选中' checked>
              <View className='text-gray-900'>选中</View>
            </Checkbox>
          </View>
          <View>
            <Checkbox value='未选中'>未选中</Checkbox>
          </View>
        </View>
      </View>
      <View className='tips'>Checkbox 这类组件比较特殊，它的样式受限于特定平台的实现</View>
      <View className='tips'>
        比如微信平台，我们只能使用 .wx-checkbox-input 这类选择器去修改原生的样式，所以目前这套样式只对微信小程序生效。所以要不你受限于平台，去编写平台特定的样式,要不就自己实现一套Checkbox，不去使用原生组件
      </View>
      <View>
        <View className='subtitle'>颜色类型</View>
        <View className='grid grid-cols-3 gap-y-2'>
          <Checkbox className='checkbox' checked value=''>
            default
          </Checkbox>
          <Checkbox className='checkbox checkbox-primary' checked value=''>
            primary
          </Checkbox>
          <Checkbox className='checkbox checkbox-success' checked value=''>
            success
          </Checkbox>
          <Checkbox className='checkbox checkbox-warning' checked value=''>
            warning
          </Checkbox>
          <Checkbox className='checkbox checkbox-error' checked value=''>
            error
          </Checkbox>
          <Checkbox className='checkbox checkbox-neutral' checked value=''>
            neutral
          </Checkbox>
        </View>
      </View>
      <View>
        <View className='subtitle'>尺寸</View>
        <View className='grid grid-cols-4 gap-y-2'>
          <Checkbox className='checkbox checkbox-primary checkbox-xs' checked value=''></Checkbox>
          <Checkbox className='checkbox checkbox-primary checkbox-sm' checked value=''></Checkbox>
          <Checkbox className='checkbox checkbox-primary checkbox-md' checked value=''></Checkbox>
          <Checkbox className='checkbox checkbox-primary checkbox-lg' checked value=''></Checkbox>
        </View>
      </View>
      <View>
        <View className='subtitle'>形状</View>
        <View className='grid grid-cols-4 gap-y-2'>
          <Checkbox className='checkbox checkbox-primary checkbox-circle' checked value=''></Checkbox>
          <Checkbox className='checkbox checkbox-primary checkbox-square' checked value=''></Checkbox>
        </View>
      </View>
    </View>
  )
}
