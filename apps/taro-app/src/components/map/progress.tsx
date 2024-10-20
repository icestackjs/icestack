import CodeRender from '@/components/CodeRender'
import { Icon, Progress, View } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className="subtitle">颜色类型</View>
      <CodeRender className="grid grid-cols-1 gap-2">
        <View>
          <Progress percent={20} show-info stroke-width="10" />
        </View>
        <View className="flex justify-between items-center">
          <Progress className="flex-1" percent={40} active stroke-width="10" />
          <Icon className="ml-2" type="cancel"></Icon>
        </View>
        <View>
          <Progress percent={60} show-info stroke-width="10" />
        </View>
        <View>
          <Progress border-radius="10" percent={80} color="#10AEFF" stroke-width="10" />
        </View>
      </CodeRender>
    </View>
  )
}
