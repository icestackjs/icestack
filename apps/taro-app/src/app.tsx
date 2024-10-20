import type { PropsWithChildren } from 'react'
import './app.scss'
// import { WebSocket } from 'weapp-websocket'

// console.log(globalThis, global, window, self)
// window.WebSocket = WebSocket

function App({ children }: PropsWithChildren) {
  // console.log(XMLHttpRequest)
  // useLaunch(() => {
  //   const ws = new WebSocket('ws://localhost:3000/socket.io')
  //   console.log(ws)
  //   console.log('App launched.')
  // })

  // children 是将要会渲染的页面
  // 在入口组件不会渲染任何内容，但我们可以在这里做类似于状态管理的事情
  return children
}

export default App
