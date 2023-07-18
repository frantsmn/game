<script setup>
const props = defineProps({
  amount: {
    type: Number,
    default: 0
  },
})
</script>

<template>
  <div class="players-amount">
    <span>Players:</span> <span class="players-amount__number">{{ props.amount }}</span>
  </div>
</template>

<style scoped lang="scss">
.players-amount {
  &__number {
    color: #747bff;
  }
}
</style>
