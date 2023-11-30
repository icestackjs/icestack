import { View, Text, Button, ViewProps } from '@tarojs/components'
import CodeRender from '@/components/CodeRender'

export default () => {
  return (
    <View>
      <View className="subtitle">默认使用</View>
      <CodeRender className="">
        <View className="tabs">
          <View className="tab">tab1</View>
          <View className="tab tab-active">tab2</View>
          <View className="tab">tab3</View>
        </View>
      </CodeRender>
      <View className="subtitle">线型</View>
      <CodeRender className="">
        <View className="tabs tabs-bordered">
          <View className="tab">tab1</View>
          <View className="tab tab-active">tab2</View>
          <View className="tab">tab3</View>
        </View>
      </CodeRender>
      <View className="subtitle">Lifted</View>
      <CodeRender className="">
        <View className="tabs tabs-lifted">
          <View className="tab">tab1</View>
          <View className="tab tab-active">tab2</View>
          <View className="tab">tab3</View>
        </View>
      </CodeRender>
      <View className="subtitle">块状</View>
      <CodeRender className="">
        <View className="tabs tabs-boxed">
          <View className="tab">tab1</View>
          <View className="tab tab-active">tab2</View>
          <View className="tab">tab3</View>
        </View>
      </CodeRender>
      <View className="subtitle">尺寸</View>
      <CodeRender className="">
        <View className="tabs tabs-boxed tabs-xs">
          <View className="tab">tab1</View>
          <View className="tab tab-active">tab2</View>
          <View className="tab">tab3</View>
        </View>
        <View className="tabs tabs-boxed tabs-sm">
          <View className="tab">tab1</View>
          <View className="tab tab-active">tab2</View>
          <View className="tab">tab3</View>
        </View>
        <View className="tabs tabs-boxed tabs-md">
          <View className="tab">tab1</View>
          <View className="tab tab-active">tab2</View>
          <View className="tab">tab3</View>
        </View>
        <View className="tabs tabs-boxed tabs-lg">
          <View className="tab">tab1</View>
          <View className="tab tab-active">tab2</View>
          <View className="tab">tab3</View>
        </View>
      </CodeRender>
    </View>
  )
}
