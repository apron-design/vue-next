<template>
  <Teleport to="body">
    <div v-if="messages.length > 0" class="apron-alert-container">
      <Message
        v-for="msg in messages"
        :key="msg.id"
        :type="msg.type"
        :message="msg.message"
        :duration="0"
        @close="handleClose(msg.id)"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AlertType } from '../Alert/icons'
import Message from './Message.vue'

interface MessageItem {
  id: string
  type: AlertType
  message: string
  visible: boolean
  leaving: boolean
}

const messages = ref<MessageItem[]>([])

const addMessage = (type: AlertType, message: string, duration: number = 5000): string => {
  const id = `apron-message-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  const newMessage: MessageItem = {
    id,
    type,
    message,
    visible: true,
    leaving: false
  }
  
  messages.value.push(newMessage)
  
  // 自动关闭
  if (duration > 0) {
    setTimeout(() => {
      handleClose(id)
    }, duration)
  }
  
  return id
}

const handleClose = (id: string) => {
  const index = messages.value.findIndex(msg => msg.id === id)
  if (index !== -1) {
    messages.value.splice(index, 1)
  }
}

const clearAll = () => {
  messages.value = []
}

// 暴露方法给父组件
defineExpose({
  addMessage,
  handleClose,
  clearAll
})
</script>