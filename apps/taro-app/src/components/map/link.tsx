import { View, Text, Button, ViewProps } from '@tarojs/components'
import CodeRender from '@/components/CodeRender'

export default () => {
  return (
    <View>
      <View className='subtitle'>颜色类型</View>
      <CodeRender className='grid grid-cols-1 gap-2'>
        <View className='link'>GitHub Actions – Enforcing</View>
        <View className='link link-success'>GitHub Actions – Enforcing</View>
        <View className='link link-warning'>GitHub Actions – Enforcing</View>
        <View className='link link-error'>GitHub Actions – Enforcing</View>
        <View className='link link-neutral'>GitHub Actions – Enforcing</View>
      </CodeRender>

      <View className='subtitle'>无下划线</View>
      <CodeRender className='grid grid-cols-1 gap-2'>
        <View className='link link-hover'>No Underline</View>
        <View className='link link-success link-hover'>No Underline</View>
      </CodeRender>

    </View>
  )
}
