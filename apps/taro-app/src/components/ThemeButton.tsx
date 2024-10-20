import { useThemeStore } from '@/store/index'
import { View } from '@tarojs/components'
import FloatButton from './FloatButton'

function ThemeButton() {
  const { mode, toggle } = useThemeStore()
  return (
    <FloatButton>
      <View className="float-btn" onClick={toggle}>
        {mode === 'dark' ? <View className="i-mdi-white-balance-sunny text-sky-500"></View> : <View className="i-mdi-weather-night text-sky-400"></View>}
      </View>
    </FloatButton>
  )
}

export default ThemeButton
