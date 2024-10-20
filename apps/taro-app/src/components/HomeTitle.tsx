import { Text, View } from '@tarojs/components'
import './HomeTitle.scss'

function HomeTitle() {
  return (
    <View className="relative mb-3 flex justify-center">
      <View className="home-title">
        <Text className="inner-text">@icestack/ui</Text>
      </View>
      <View
        className="invisible"
        style={{
          fontSize: '10vw',
          lineHeight: 1,
        }}
      >
        @icestack/ui
      </View>
    </View>
  )
}

export default HomeTitle
