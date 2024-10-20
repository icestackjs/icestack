import { Radio, View } from '@tarojs/components'
// import './radio.scss'
import CodeRender from '@/components/CodeRender'

export default () => {
  return (
    <View>
      <View>
        <View className="subtitle">微信平台组件默认样式</View>
        <View className="grid grid-cols-3">
          <View>
            <Radio value="选中" checked>
              <View className="text-gray-900">选中</View>
            </Radio>
          </View>
          <View>
            <Radio value="未选中">未选中</Radio>
          </View>
        </View>
      </View>
      <View className="tips">Radio 这类组件比较特殊，它的样式受限于特定平台的实现</View>
      <View className="tips">
        比如微信平台，我们只能使用 .wx-radio-input 这类选择器去修改原生的样式，所以目前这套样式只对微信小程序生效。所以要不你受限于平台，去编写平台特定的样式,要不就自己实现一套
        Radio，不去使用原生组件
      </View>
      <View>
        <View className="subtitle">颜色类型</View>
        <CodeRender className="grid grid-cols-3 gap-y-2">
          <Radio className="radio" checked value="">
            default
          </Radio>
          <Radio className="radio radio-primary" checked value="">
            primary
          </Radio>
          <Radio className="radio radio-success" checked value="">
            success
          </Radio>
          <Radio className="radio radio-warning" checked value="">
            warning
          </Radio>
          <Radio className="radio radio-error" checked value="">
            error
          </Radio>
          <Radio className="radio radio-neutral" checked value="">
            neutral
          </Radio>
        </CodeRender>
      </View>
      <View>
        <View className="subtitle">尺寸</View>
        <CodeRender className="grid grid-cols-4 gap-y-2">
          <Radio className="radio radio-xs radio-primary" checked value=""></Radio>
          <Radio className="radio radio-sm radio-primary" checked value=""></Radio>
          <Radio className="radio radio-md radio-primary" checked value=""></Radio>
          <Radio className="radio radio-lg radio-primary" checked value=""></Radio>
        </CodeRender>
      </View>
      <View>
        <View className="subtitle">形状</View>
        <CodeRender className="grid grid-cols-4 gap-y-2">
          <Radio className="radio radio-circle radio-primary" checked value=""></Radio>
          <Radio className="radio radio-square radio-primary" checked value=""></Radio>
        </CodeRender>
      </View>
    </View>
  )
}
