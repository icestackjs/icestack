import { View, Image, Button, ViewProps } from '@tarojs/components'
import pig from '../../assets/pig.jpg'
import panda from '../../assets/panda.jpg'
import CodeRender from '@/components/CodeRender'

export default () => {
  return (
    <View>
      <View className='subtitle'>颜色类型</View>
      <CodeRender className=''>
        <View className='chat chat-end'>
          <View className='chat-header'>pig</View>
          <View className='chat-image avatar'>
            <Image className='w-10 rounded-full' src={pig} mode='widthFix' />
          </View>
          <View className='chat-bubble chat-bubble-primary'>你为啥不开心呀？</View>
          <View className='chat-footer opacity-50'>Delivered</View>
        </View>
        <View className='chat chat-start'>
          <View className='chat-image avatar'>
            <Image className='w-10 rounded-full' src={panda} mode='widthFix' />
          </View>
          <View className='chat-header'>panda</View>
          <View className='chat-bubble'>我想念我的饲养员了</View>
          <View className='chat-footer opacity-50'>Delivered</View>
        </View>
        <View className='chat chat-start'>
          <View className='chat-header'>panda</View>
          <View className='chat-image avatar'>
            <Image className='w-10 rounded-full' src={panda} mode='widthFix' />
          </View>
          <View className='chat-bubble chat-bubble-warning'>你想念你的吗？</View>
          <View className='chat-footer opacity-50'>Delivered</View>
        </View>
        <View className='chat chat-end'>
          <View className='chat-header'>pig</View>
          <View className='chat-image avatar'>
            <Image className='w-10 rounded-full' src={pig} mode='widthFix' />
          </View>
          <View className='chat-bubble chat-bubble-primary'>...</View>
          <View className='chat-footer opacity-50'></View>
        </View>
      </CodeRender>
    </View>
  )
}
