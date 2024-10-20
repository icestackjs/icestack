import { View } from '@tarojs/components'
// import './range.scss'
import CodeRender from '@/components/CodeRender'
import './steps.scss'

export default () => {
  return (
    <View>
      <View className="subtitle">颜色类型</View>
      <CodeRender className="">
        <View className="steps w-full">
          <View className="step step-primary">注册</View>
          <View className="step step-primary">登陆</View>
          <View className="step">玩游戏</View>
          <View className="step">充钱</View>
        </View>
      </CodeRender>
      <View className="subtitle">方向与自定义内容</View>
      <CodeRender className="">
        <View className="steps steps-vertical">
          <View className="step step-success after:!content-['💗']">原</View>
          <View className="step step-success after:!content-['🌾']">神</View>
          <View className="step step-success after:!content-['🤣']">启</View>
          <View className="step step-success after:!content-['🦨']">动</View>
        </View>
      </CodeRender>
      {/* <View className="xxx"  data-yyy="yyy" data-xxx="ggg">xxx</View> */}
      {/* https://nervjs.github.io/taro/docs/vue-overall/#dataset */}
      <View className="subtitle">滑动</View>
      <CodeRender>
        <View className="overflow-x-auto py-2">
          <View className="steps">
            <View className="step">start</View>
            <View className="step-secondary step">2</View>
            <View className="step-secondary step">3</View>
            <View className="step-secondary step">4</View>
            <View className="step">5</View>
            <View className="step-accent step">6</View>
            <View className="step-accent step">7</View>
            <View className="step">8</View>
            <View className="step step-error">9</View>
            <View className="step step-error">10</View>
            <View className="step">11</View>
            <View className="step">12</View>
            <View className="step step-warning">13</View>
            <View className="step step-warning">14</View>
            <View className="step">15</View>
            <View className="step step-neutral">16</View>
            <View className="step step-neutral">17</View>
            <View className="step step-neutral">18</View>
            <View className="step step-neutral">19</View>
            <View className="step step-neutral">20</View>
            <View className="step step-neutral">21</View>
            <View className="step step-neutral">22</View>
            <View className="step step-neutral">23</View>
            <View className="step step-neutral">end</View>
          </View>
        </View>
      </CodeRender>
    </View>
  )
}
