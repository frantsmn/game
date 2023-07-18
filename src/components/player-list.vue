<script setup>
import {state} from '@/modules/socket/index.js'
</script>

<template>
  <ul v-if="state.players.length" class="player-list">
    <li
      v-for="player in state.players"
      :key="player.uid"
      class="player-list__item"
      :class="{active: state.uid === player.uid}"
    >
      {{ player.name }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
.player-list {
  max-width: 50%;
  margin: 0;
  padding-inline: 10px;
  padding-inline-start: 20px;
  padding-block-end: 10px;
  background-color: rgba(26, 24, 24, 0.4);
  font-size: 0.7rem;
  list-style-type: decimal;
  display: flex;
  flex-direction: column;
  align-items: start;

  &__item {
    background-color: rgba(116, 123, 255, 0.2);
    border: solid 1px transparent;
    width: auto;
    padding: 0 4px;
    margin: 1.5px 0;
    opacity: 0.5;
    border-radius: 4px;

    &.active {
      border: solid 1px rgba(125, 255, 116, 0.7);
    }
  }
}
</style>
