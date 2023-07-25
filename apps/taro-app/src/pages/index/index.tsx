// import { css } from '@linaria/core'
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
// import { css } from '../../../styled-system/css'
import { css } from '@styled-system/css'
import './index.scss'

// import {styled} from '@linaria/react'
// import { css } from '@linaria/core'
// const AAA = styled.h2`
// color:red;
// `
// const titleCls = css`
//   background: red;
// `

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View>
      <Text
        className={css({
          color: 'red.400',
        })}
      >
        Hello world!
      </Text>
      {/* <AAA>AAA</AAA> */}
    </View>
  )
}
