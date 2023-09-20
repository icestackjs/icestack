<template>
  <BaseLayout>
    <view
      class="text-[#5cab3d] deep:text-red-300 dark:text-red-600 fantasy:text-red-900">
      111
    </view>
  </BaseLayout>
</template>

<script setup lang="ts">
import { io } from 'socket.io-client'
import BaseLayout from '@/components/BaseLayout.vue'

onLoad(() => {
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
</script>

<style lang="scss" scoped></style>
