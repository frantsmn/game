<script setup>
import {computed} from 'vue'
import {get} from '@vueuse/core'

const props = defineProps({
  isConnected: {
    type: Boolean,
    default: false
  },
})

const status = computed(() => get(props.isConnected) ? 'Connected' : 'Disconnected')
const classes = computed(() => ({
  connected: get(props.isConnected)
}))
</script>

<template>
  <div class="connection" :class="classes">
    <span class="connection__indicator">•</span>
    <span>{{ status }}</span>
  </div>
</template>

<style lang="scss" scoped>
.connection {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  &__indicator {
    color: red;
    transform: scale(200%) translateY(-1px);
  }

  &.connected &__indicator {
    color: greenyellow;
  }
}
</style>
