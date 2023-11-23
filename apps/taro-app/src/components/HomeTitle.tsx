import { View, Text } from '@tarojs/components'
import './HomeTitle.scss'

const HomeTitle = () => {
  return (
    <View className='relative mb-3'>
      <View className='home-title'>
        <Text className='inner-text'>@icestack/ui</Text>
      </View>
      <View
        className='invisible'
        style={{
          fontSize: '10vw',
          lineHeight: 1
        }}
      >
        @icestack/ui
      </View>
    </View>
  )
}

export default HomeTitle
