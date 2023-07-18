<script setup>
import {state} from '@/modules/socket/index.js'
import ConnectionIndicator from '@/components/header/connection-indicator.vue'
import PlayersAmount from '@/components/header/players-amount.vue'
import MenuBar from '@/components/header/menu-bar.vue'
</script>

<template>
  <header class="header">
    <div class="header__left">
      <ConnectionIndicator :is-connected="state.connected" />
      <PlayersAmount :amount="state.playersAmount" />
    </div>
    <div class="header__right">
      <MenuBar />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: rgba(26, 24, 24, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  &__left {
    line-height: initial;
    display: flex;
    gap: 15px;
  }
}
</style>
