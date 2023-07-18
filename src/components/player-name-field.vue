<script setup>
import {ref} from 'vue'
import {socket} from '@/modules/socket/index.js'
import {get} from '@vueuse/core'

const playerName = ref('')

const applyName = () => {
  socket.emit('updateName', get(playerName))
  document.title = `Виталя Гейминг • ${get(playerName)}`
}
</script>

<template>
  <div class="player-name-field">
    <input v-model="playerName" placeholder="Сей йор нэйм">
    <button @click="applyName">Гад дэм райт!</button>
  </div>
</template>

<style scoped lang="scss">
.player-name-field {
  display: flex;
  gap: 10px;
  padding: 10px;
}
</style>
