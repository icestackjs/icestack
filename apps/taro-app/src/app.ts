import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.scss'
import { WeappWebSocket } from 'weapp-websocket'

window.WebSocket = WeappWebSocket

function App({ children }: PropsWithChildren) {
  console.log(XMLHttpRequest)
  useLaunch(() => {
    const ws = new WeappWebSocket('ws://localhost:3000/socket.io')
    console.log(ws)
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
