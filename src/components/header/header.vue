<script setup>
import {state} from '@/modules/socket/index.js'
import ConnectionIndicator from '@/components/header/connection-indicator.vue'
import PlayersAmount from '@/components/header/players-amount.vue'
import MenuBar from '@/components/header/menu-bar.vue'
</script>

<template>
  <header class="header">
    <div class="header__left">
      <PlayersAmount :amount="state.players.length" />
    </div>
    <div class="header__right">
      <ConnectionIndicator :is-connected="state.connected" />
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
  width: 100%;
  height: 60px;

  &__left, &__right {
    line-height: initial;
    display: flex;
    align-items: center;
    gap: 15px;
  }
}
</style>
