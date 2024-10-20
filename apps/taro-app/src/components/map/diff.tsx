import { View } from '@tarojs/components'

export default () => {
  return (
    <View>
      <View className="subtitle">默认使用</View>
      <View>
        <View className="diff aspect-[16/9]">
          <View className="diff-item-1">
            <View className="font-black grid place-content-center">XXXX</View>
          </View>
          <View className="diff-item-2">
            <View className="font-black grid place-content-center">XXXX</View>
          </View>
          <View className="diff-resizer"></View>
        </View>
      </View>
    </View>
  )
}
