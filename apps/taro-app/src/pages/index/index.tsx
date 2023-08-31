// import { css } from '@linaria/core'
import { View, Text, Button, ViewProps } from '@tarojs/components'
// import { styled } from '@linaria/react'
import { useLoad } from '@tarojs/taro'
import React, { useState } from 'react'
// import { css } from '../../../styled-system/css'
import { css } from '@styled-system/css'
import { token } from '@styled-system/tokens'
import './index.scss'

// declare type Component<TProps> =
//   | ((props: TProps) => any)
//   | {
//       new (props: TProps): any
//     }

// type VPS = ViewProps & { style?: React.CSSProperties }
// type TP = VPS & { color: string }
// const Title = styled<TP, VPS, Component<TP>>(View)`
//   color: ${(props) => props.color};
// `
// import {styled} from '@linaria/react'
// import { css } from '@linaria/core'
// const AAA = styled.h2`
// color:red;
// `
// const titleCls = css`
//   background: red;
// `

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

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })
  const [color, setColor] = useState('red.300')
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
      <Text
        className={css({
          color
        })}
      >
        red.300
      </Text>
      {/* <Button className='btn'>Button</Button> */}
      {/* <AAA>AAA</AAA> */}
      <Component color={runtimeColor}></Component>
      <Button
        onClick={() => {
          if (runtimeColor === 'blue.300') {
            setRuntimeColor('pink.300')
          } else {
            setRuntimeColor('blue.300')
          }
        }}
      >
        click
      </Button>
    </View>
  )
}
