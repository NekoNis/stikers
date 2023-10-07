<script setup>
  import { ref } from 'vue'
  const count = ref(1)
</script>

<template>
  <input v-model="count" style="margin-right: 10px">
  <button @click="count++" style="margin-right: 10px">
    Сумматор
  </button>
  <span>Cчёт: {{ count }}</span>
</template>

<style scoped>

</style>