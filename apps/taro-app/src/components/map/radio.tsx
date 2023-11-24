import { View, Text, Button, ViewProps, Radio } from '@tarojs/components'
// import './radio.scss'
import MarkdownRender from '@/components/MarkdownRender'

export default () => {
  return (
    <View>
      <View>
        <View className='subtitle'>微信平台组件默认样式</View>
        <View className='grid grid-cols-3'>
          <View>
            <Radio value='选中' checked>
              <View className='text-gray-900'>选中</View>
            </Radio>
          </View>
          <View>
            <Radio value='未选中'>未选中</Radio>
          </View>
        </View>
      </View>
      <View className='tips'>Radio 这类组件比较特殊，它的样式受限于特定平台的实现</View>
      <View className='tips'>
        比如微信平台，我们只能使用 .wx-radio-input
        这类选择器去修改原生的样式，所以目前这套样式只对微信小程序生效。所以要不你受限于平台，去编写平台特定的样式,要不就自己实现一套 Radio，不去使用原生组件
      </View>
      <View>
        <View className='subtitle'>颜色类型</View>
        <View className='grid grid-cols-3 gap-y-2'>
          <Radio className='radio' checked value=''>
            default
          </Radio>
          <Radio className='radio radio-primary' checked value=''>
            primary
          </Radio>
          <Radio className='radio radio-success' checked value=''>
            success
          </Radio>
          <Radio className='radio radio-warning' checked value=''>
            warning
          </Radio>
          <Radio className='radio radio-error' checked value=''>
            error
          </Radio>
          <Radio className='radio radio-neutral' checked value=''>
            neutral
          </Radio>
        </View>
        <MarkdownRender content={`<Radio className='radio' checked value=''>
            default
          </Radio>
          <Radio className='radio radio-primary' checked value=''>
            primary
          </Radio>
          <Radio className='radio radio-success' checked value=''>
            success
          </Radio>
          <Radio className='radio radio-warning' checked value=''>
            warning
          </Radio>
          <Radio className='radio radio-error' checked value=''>
            error
          </Radio>
          <Radio className='radio radio-neutral' checked value=''>
            neutral
          </Radio>`}
        ></MarkdownRender>
      </View>
      <View>
        <View className='subtitle'>尺寸</View>
        <View className='grid grid-cols-4 gap-y-2'>
          <Radio className='radio radio-primary radio-xs' checked value=''></Radio>
          <Radio className='radio radio-primary radio-sm' checked value=''></Radio>
          <Radio className='radio radio-primary radio-md' checked value=''></Radio>
          <Radio className='radio radio-primary radio-lg' checked value=''></Radio>
        </View>
        <MarkdownRender content={`<Radio className='radio radio-primary radio-xs' checked value=''></Radio>
          <Radio className='radio radio-primary radio-sm' checked value=''></Radio>
          <Radio className='radio radio-primary radio-md' checked value=''></Radio>
          <Radio className='radio radio-primary radio-lg' checked value=''></Radio>`}
        ></MarkdownRender>
      </View>
      <View>
        <View className='subtitle'>形状</View>
        <View className='grid grid-cols-4 gap-y-2'>
          <Radio className='radio radio-primary radio-circle' checked value=''></Radio>
          <Radio className='radio radio-primary radio-square' checked value=''></Radio>
        </View>
        <MarkdownRender content={`<Radio className='radio radio-primary radio-circle' checked value=''></Radio>
          <Radio className='radio radio-primary radio-square' checked value=''></Radio>`}
        ></MarkdownRender>
      </View>
    </View>
  )
}
