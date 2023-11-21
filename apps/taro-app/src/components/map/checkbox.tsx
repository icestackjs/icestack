import { View, Text, Button, ViewProps, Checkbox, Label } from '@tarojs/components'
import './checkbox.scss'

export default () => {
  const list = [
    {
      value: '美国',
      text: '美国',
      checked: false
    },
    {
      value: '中国',
      text: '中国',
      checked: true
    },
    {
      value: '巴西',
      text: '巴西',
      checked: false
    },
    {
      value: '日本',
      text: '日本',
      checked: false
    },
    {
      value: '英国',
      text: '英国',
      checked: false
    },
    {
      value: '法国',
      text: '法国',
      checked: false
    }
  ]
  return (
    <View>
      <View>
        <View className='subtitle'>默认样式</View>
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
      <View>
        <View className='subtitle'>展示样式</View>
        <View className='grid grid-cols-3 gap-y-2'>
          {list.map((item, i) => {
            return (
              <Label for={i.toString()} key={i}>
                <Checkbox className='ice-checkbox' value={item.value} checked={item.checked}>
                  {item.text}
                </Checkbox>
              </Label>
            )
          })}
        </View>
      </View>
      <View className='tips'>Checkbox 这类组件比较特殊，微信/其他平台都直接提供了 Checkbox 组件，它的样式受限于特定平台的实现</View>
      <View className='tips'>
        比如微信平台，我们只能使用 .wx-checkbox-input 这类选择器去修改原生的样式。所以所以要不你受限于平台，去编写平台特定的样式,要不就自己实现一套Checkbox，不去使用原生组件
      </View>
    </View>
  )
}
