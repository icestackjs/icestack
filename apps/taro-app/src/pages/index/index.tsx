import { View, Text, Button, ViewProps } from '@tarojs/components'
// import { useLoad } from '@tarojs/taro'
// import React, { useState, Fc } from 'react'
import './index.scss'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

export default function Index() {
  useEffect(() => {
    // const ws = new WebSocket('http://localhost:3000')

    const socket = io('http://localhost:3000/events', {
      reconnectionDelayMax: 10000,
      auth: {
        token: '123'
      },
      query: {
        'my-key': 'my-value'
      },
      transports: ['polling', 'websocket']
    })
    socket.on('connect', function () {
      console.log('Connected')

      socket.emit('events', { test: 'test' })
      socket.emit('identity', 0, (response) => console.log('Identity:', response))
    })
    socket.on('events', function (data) {
      console.log('event', data)
    })
    socket.on('exception', function (data) {
      console.log('event', data)
    })
    socket.on('disconnect', function () {
      console.log('Disconnected')
    })

    socket.on('connect_error', (error) => {
      console.error(error)
    })
  })
  return <View className='bg-[#33ff00] card'>12345</View>
}
