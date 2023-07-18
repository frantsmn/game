<script setup>
// шо?
</script>

<template>
  <section class="canvas">
    тут буде тигра
    <canvas width="1280" height="640" />
  </section>
</template>

<style lang="scss" scoped>
.canvas {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1280px;
  max-height: 640px;
  width: 100vw;
  height: 50vw;
  padding: 0.5rem;
  //border: rgba(173, 255, 47, 0.2) dashed 1px;

  canvas {
    background-color: #1a1a1a;
  }
}
</style>
