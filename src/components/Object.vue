<script setup>
</script>

<template>
  <div class="object">
    <img id="img-icon" src="#">
    <span id="img-name">
      <slot name="name"></slot>
    </span>
    <span id="img-size">
      <slot name="size"></slot>
    </span>
    <div class="img-count">
      <slot name="count"></slot>
    </div>
  </div>
</template>

<style scoped>
  .object {
    background-color: #0f0;
    position: relative;
    left: 1px;
    width: calc(100% - 2px);
    height: 60px;
    margin-top: 1px;
  }

  #img-icon {
    position: relative;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
  }

  #img-name {
    position: absolute;
    top: 8px;
    left: 60px;
  }

  #img-size {
    position: absolute;
    left: 60px;
    bottom: 8px;
  }

  .img-count {
    position: absolute;
    right: 10px;
    top: 20px;
  }
</style>