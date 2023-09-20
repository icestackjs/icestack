import { WeappWebSocket } from 'weapp-websocket'
import { XMLHttpRequest } from 'weapp-xmlhttprequest'

// global.window = globalThis
// global.self = globalThis
// globalThis.self = globalThis
// globalThis.window = globalThis
console.log(globalThis, global, window, self)
globalThis.WebSocket = WeappWebSocket
globalThis.XMLHttpRequest = XMLHttpRequest
