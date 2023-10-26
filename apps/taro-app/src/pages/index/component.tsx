import { View, Text, Button, ViewProps } from '@tarojs/components'
// import { useLoad } from '@tarojs/taro'
import React, { useState } from 'react'
import './index.scss'
import ThemeProvider from '../../components/ThemeProvider'
import Taro, { useLoad } from '@tarojs/taro'

const map = {
  alert: (
    <View>
      <View className='alert'>
        <Text className='i-mdi-information-outline w-6 h-6'></Text>
        <Text>默认alert</Text>
      </View>
      <View className='alert alert-primary'>
        <Text className='i-mdi-information-outline w-6 h-6'></Text>
        <Text>默认alert</Text>
      </View>
      <View className='alert alert-success'>
        <Text className='i-mdi-information-outline w-6 h-6'></Text>
        <Text>默认alert</Text>
      </View>
      <View className='alert alert-warning'>
        <Text className='i-mdi-information-outline w-6 h-6'></Text>
        <Text>默认alert</Text>
      </View>
    </View>
  )
}

// function Alert() {
//   return (
//     <View>
//       <View className='alert'>
//         <View className='i-mdi-information-outline w-6 h-6'></View>
//         <View>默认alert</View>
//       </View>
//     </View>
//   )
// }

export default function Index() {
  const [com, setCom] = useState('')
  useLoad<{ id: string }>((params) => {
    if (params.id) {
      Taro.setNavigationBarTitle({
        title: params.id
      })
      setCom(params.id)
    }
  })
  const TargetCom = map[com] // ?? <></>
  return (
    <ThemeProvider>
      {TargetCom}
      {/* <Alert></Alert> */}
      {/* <TargetCom></TargetCom> */}
    </ThemeProvider>
  )
}
