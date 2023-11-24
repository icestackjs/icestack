import { View, Text, Slider, Textarea } from '@tarojs/components'
import MarkdownRender from '@/components/MarkdownRender'

export default () => {
  return (
    <View>
      <View className='subtitle'>颜色类型</View>
      <MarkdownRender className='grid grid-cols-1 gap-2'>
        <Textarea className='textarea textarea-bordered' placeholder='bordered placeholder'></Textarea>
        <Textarea className='textarea textarea-primary' placeholder='primary placeholder'></Textarea>
        <Textarea className='textarea textarea-success' placeholder='success placeholder'></Textarea>
        <Textarea className='textarea textarea-warning' placeholder='warning placeholder'></Textarea>
        <Textarea className='textarea textarea-error' placeholder='error placeholder'></Textarea>
        <Textarea className='textarea textarea-neutral' placeholder='neutral placeholder'></Textarea>
      </MarkdownRender>
      <View className='subtitle'>禁用</View>
      <MarkdownRender className='grid grid-cols-1 gap-2'>
        <Textarea className='textarea textarea-bordered textarea-disabled' placeholder='placeholder'></Textarea>
      </MarkdownRender>
      <View className='subtitle'>尺寸</View>
      <MarkdownRender className='grid grid-cols-1 gap-2'>
        <Textarea className='textarea textarea-bordered textarea-xs' placeholder='placeholder'></Textarea>
        <Textarea className='textarea textarea-bordered textarea-sm' placeholder='placeholder'></Textarea>
        <Textarea className='textarea textarea-bordered textarea-md' placeholder='placeholder'></Textarea>
        <Textarea className='textarea textarea-bordered textarea-lg' placeholder='placeholder'></Textarea>
      </MarkdownRender>
    </View>
  )
}
