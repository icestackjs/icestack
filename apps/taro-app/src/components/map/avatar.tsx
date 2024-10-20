import { Image, View } from '@tarojs/components'
import panda from '../../assets/pig.jpg'
// import { cx } from 'class-variance-authority'
import CodeRender from '@/components/CodeRender'

export default () => {
  return (
    <View>
      <View className="subtitle">形状</View>

      <CodeRender className="grid grid-cols-2 gap-2">
        <View className="avatar">
          <Image className="w-24 rounded" mode="widthFix" src={panda}></Image>
        </View>
        <View className="avatar">
          <Image className="w-24 rounded-full" mode="widthFix" src={panda}></Image>
        </View>
      </CodeRender>
      <View className="subtitle">尺寸</View>
      <CodeRender className="grid grid-cols-2 gap-2">
        <View className="avatar">
          <Image className="w-24 rounded" mode="widthFix" src={panda}></Image>
        </View>
        <View className="avatar">
          <Image className="w-20 rounded" mode="widthFix" src={panda}></Image>
        </View>
        <View className="avatar">
          <Image className="w-16 rounded" mode="widthFix" src={panda}></Image>
        </View>
        <View className="avatar">
          <Image className="w-12 rounded" mode="widthFix" src={panda}></Image>
        </View>
      </CodeRender>
    </View>
  )
}
