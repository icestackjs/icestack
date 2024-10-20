import { Slider, View } from '@tarojs/components'
// import './range.scss'
import CodeRender from '@/components/CodeRender'

export default () => {
  return (
    <View>
      <View className="subtitle">微信平台默认样式</View>
      <View className="grid grid-cols-1 gap-2">
        <Slider></Slider>
      </View>
      <View className="subtitle">颜色类型</View>
      <CodeRender className="grid grid-cols-1 gap-2">
        <Slider className="range" value={10}></Slider>
        <Slider className="range range-primary" value={20}></Slider>
        <Slider className="range range-success" value={30}></Slider>
        <Slider className="range range-warning" value={40}></Slider>
        <Slider className="range range-error" value={50}></Slider>
        <Slider className="range range-neutral" value={60}></Slider>
      </CodeRender>
      <View className="subtitle">尺寸</View>
      <CodeRender className="grid grid-cols-1 gap-2">
        <Slider className="range range-xs" value={60}></Slider>
        <Slider className="range range-sm" value={60}></Slider>
        <Slider className="range range-md" value={60}></Slider>
        <Slider className="range range-lg" value={60}></Slider>
      </CodeRender>
    </View>
  )
}
