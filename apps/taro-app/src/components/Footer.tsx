import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

const Footer = () => {
  return (
    <View className='text-xs text-center h-full flex justify-center items-center mt-4'>
      <Text>Powered by</Text>
      <Text
        className='link link-primary mx-1'
        onClick={() => {
          Taro.setClipboardData({
            data: 'https://weapp-tw.icebreaker.top/'
          })
        }}
      >
        weapp-tailwindcss
      </Text>
      <Text className=''>and </Text>
      <Text
        className='link link-primary mx-1'
        onClick={() => {
          Taro.setClipboardData({
            data: 'https://taro-docs.jd.com/docs/'
          })
        }}
      >
        tarojs
      </Text>
    </View>
  )
}

export default Footer
