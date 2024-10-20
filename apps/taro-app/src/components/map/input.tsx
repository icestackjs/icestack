import CodeRender from '@/components/CodeRender'
import { Input, View } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className="subtitle">颜色类型</View>
      <CodeRender className="grid grid-cols-1 gap-2">
        <Input className="input input-primary" placeholder="primary input"></Input>
        <Input className="input input-success" placeholder="success input"></Input>
        <Input className="input input-warning" placeholder="warning input"></Input>
        <Input className="input input-error" placeholder="error input"></Input>
        <Input className="input input-neutral" placeholder="neutral input"></Input>
      </CodeRender>

      <View className="subtitle">显示边框(默认不显示边框)</View>
      <CodeRender className="grid grid-cols-1 gap-2">
        <Input className="input" placeholder="default input"></Input>
        <Input className="input input-bordered" placeholder="default input"></Input>
      </CodeRender>

      <View className="subtitle">尺寸</View>
      <CodeRender className="grid grid-cols-1 gap-2">
        <Input className="input input-xs input-primary" placeholder="input-xs"></Input>
        <Input className="input input-sm input-primary" placeholder="input-sm"></Input>
        <Input className="input input-md input-primary" placeholder="input-md"></Input>
        <Input className="input input-lg input-primary" placeholder="input-lg"></Input>
      </CodeRender>

      <View className="subtitle">禁用状态</View>
      <CodeRender className="grid grid-cols-1 gap-2">
        <Input className="input input-disabled" placeholder="input-disabled"></Input>
      </CodeRender>
    </View>
  )
}
