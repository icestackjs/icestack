import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { version } from '~/package.json'
const Footer = () => {
  return (
    <View className="mt-4  h-full  pb-4 text-center text-xs">
      <View>@icestack/ui {version}</View>
      <View className="flex items-center justify-center">
        <Text>Powered by</Text>
        <Text
          className="link link-primary mx-1"
          onClick={() => {
            Taro.setClipboardData({
              data: 'https://weapp-tw.icebreaker.top/'
            })
          }}
        >
          weapp-tailwindcss
        </Text>
        <Text className="">and </Text>
        <Text
          className="link link-primary mx-1"
          onClick={() => {
            Taro.setClipboardData({
              data: 'https://taro-docs.jd.com/docs/'
            })
          }}
        >
          tarojs
        </Text>
      </View>
    </View>
  )
}

export default Footer
