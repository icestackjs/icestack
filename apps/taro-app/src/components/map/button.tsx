import { View, Text, Button, ViewProps } from '@tarojs/components'
import MarkdownRender from '@/components/MarkdownRender'

export default () => {
  return (
    <View>
      <View className='subtitle'>按钮类型</View>

      <MarkdownRender className='grid grid-cols-3 gap-2'>
        <Button className='btn'>默认按钮</Button>
        <Button className='btn btn-primary'>主要按钮</Button>
        <Button className='btn btn-success'>成功按钮</Button>
        <Button className='btn btn-warning'>警告按钮</Button>
        <Button className='btn btn-error'>错误按钮</Button>
        <Button className='btn btn-neutral'>中性按钮</Button>
      </MarkdownRender>

      <View className='subtitle'>朴素按钮</View>
      <MarkdownRender className='grid grid-cols-3 gap-2'>
        <Button className='btn btn-outline'>默认按钮</Button>
        <Button className='btn btn-outline btn-primary'>主要按钮</Button>
        <Button className='btn btn-outline btn-success'>成功按钮</Button>
        <Button className='btn btn-outline btn-warning'>警告按钮</Button>
        <Button className='btn btn-outline btn-error'>错误按钮</Button>
        <Button className='btn btn-outline btn-neutral'>中性按钮</Button>
      </MarkdownRender>
      <View className='tips'>朴素默认按钮使用的border-color 为 currentColor，和中性按钮是不同的</View>

      <View className='subtitle'>禁用状态</View>
      <MarkdownRender className='grid grid-cols-3 gap-2'>
        <Button className='btn btn-disabled'>禁用状态</Button>
      </MarkdownRender>

      <View className='subtitle'>Loading</View>
      <MarkdownRender className='grid grid-cols-3 gap-2'>
        <Button className='btn'>
          <View className='loading loading-sm mr-2'></View>
          加载中
        </Button>
      </MarkdownRender>

      <View className='subtitle'>形状</View>
      <MarkdownRender className='grid grid-cols-3 gap-2'>
        <Button className='btn btn-circle'>圆形</Button>
        <Button className='btn btn-square'>方形</Button>
      </MarkdownRender>


      <View className='subtitle'>按钮尺寸</View>
      <View className='space-y-2'>
        <MarkdownRender className='grid grid-cols-2 gap-2'>
          <Button className='btn btn-xs'>btn-xs</Button>
          <Button className='btn btn-sm'>btn-sm</Button>
          <Button className='btn btn-md'>btn-md</Button>
          <Button className='btn btn-lg'>btn-lg</Button>
        </MarkdownRender>
        <MarkdownRender className='flex justify-center'>
          <Button className='btn btn-wide'>btn-wide</Button>
        </MarkdownRender>
        <MarkdownRender>
          <Button className='btn btn-block'>btn-block</Button>
        </MarkdownRender>
      </View>
    </View>
  )
}
