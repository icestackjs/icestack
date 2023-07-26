import { View, Text, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
// import { css } from '../../../styled-system/css'
import { css } from '@styled-system/css'
import { token } from '@styled-system/tokens'

const Component = (props) => {
  return (
    <View
      className={css({
        // ✅ Good: Store the value in a CSS custom property
        color: 'var(--color)'
      })}
      style={{
        // ✅ Good: Handle the runtime value in the style attribute
        '--color': token(`colors.${props.color}`)
      }}
    >
      Dynamic color with runtime value
    </View>
  )
}

export default function Test() {
  const [runtimeColor, setRuntimeColor] = useState('pink.300')
  return (
    <View>
      <Text
        className={css({
          color: 'green.400',
          bg: 'gray.200',
          border: '1px solid token(colors.red.400,red)'
        })}
      >
        Hello world!
      </Text>
      <Component color={runtimeColor}></Component>
    </View>
  )
}
