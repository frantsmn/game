<script setup>
import {socket, state} from '@/modules/socket/index.js'
</script>

<template>
  <div class="menu-bar">
    <button class="connect-btn" v-if="!state.connected" @click="socket.connect()">Connect</button>
    <button class="disconnect-btn" v-else @click="socket.disconnect()">Disconnect</button>
  </div>
</template>

<style scoped lang="scss">
.menu-bar {
  display: flex;
  gap: 10px;
  padding: 0 10px;

  .connect-btn{
    border: rgba(47, 255, 0, 0.2) solid 1px;
  }

  .disconnect-btn{
    border: rgba(255, 0, 0, 0.2) solid 1px;
  }
}
</style>
