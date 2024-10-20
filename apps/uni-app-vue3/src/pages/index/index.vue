<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import { io } from 'socket.io-client'

onLoad(() => {
  const socket = io('http://localhost:3000/events', {
    reconnectionDelayMax: 10000,
    auth: {
      token: '123',
    },
    query: {
      'my-key': 'my-value',
    },
    transports: ['polling', 'websocket'],
  })
  socket.on('connect', () => {
    console.log('Connected')

    socket.emit('events', { test: 'test' })
    socket.emit('identity', 0, response => console.log('Identity:', response))
  })
  socket.on('events', (data) => {
    console.log('event', data)
  })
  socket.on('exception', (data) => {
    console.log('event', data)
  })
  socket.on('disconnect', () => {
    console.log('Disconnected')
  })

  socket.on('connect_error', (error) => {
    console.error(error)
  })
})
</script>

<template>
  <BaseLayout>
    <view
      class="text-[#5cab3d] deep:text-red-300 dark:text-red-600 fantasy:text-red-900"
    >
      111
    </view>
  </BaseLayout>
</template>

<style lang="scss" scoped></style>
