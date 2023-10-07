<script setup>
import Item from './Object.vue'
import {ref} from "vue";

const count = ref(1)
const loaded = ref(false)
function countMinusFunc(event) {if (event) {if (count.value != 0) {count.value--}}}
/*
изучить:
  жизненный цикл компонентов
  react.js
*/
</script>

<template>
  <main>
    <template v-if="loaded === false">
      <button @click="loaded = true">ема...</button>
      <div class="input-wrapper">
        <input type="file" id="input-file" class="input-hidden" style="width: 0;" multiple>
        <label for="input-file" class="input-styled">
          <span class="icon-input"><img class="input-icon" src="./icons/IconUpload.svg" alt="Выбрать файл"></span>
        </label>
      </div>
    </template>
    <template v-else-if="loaded === true">
      <div class="load-objects">
        <!-- Example of object -->
        <Item v-for="i in 10">
          <template #name>name.png</template>
          <template #size>128x128</template>
          <template #count>
            <button @click="countMinusFunc" style="margin-right: 5px">-</button>
            <input v-model="count" style="margin-right: 5px; width: 20px; height: 20px; border: 0; text-align: center">
            <button @click="count++" style="margin-right: 5px">+</button>
          </template>
        </Item>
      </div>
    </template>
  </main>
  <section>
    <!-- There will be stickers here soon -->
  </section>
</template>

<style scoped>
  /* style */
  .load-objects {
    position: absolute;
    left: 0;
    top: 0;
    width: 25%;
    background-color: #f00;
  }

  .input-hidden {
    opacity: 0;
    visibility: hidden;
  }

  .input-wrapper {
    position: absolute;
    left: 50px;
    top: 50px;
  }

  .icon-input {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    height: 100px;
    background-color: #f00;
    border-radius: 40px;
  }

  .input-icon {
    position: relative;
    display: flex;
    margin: auto;
    width: 50px;
    top: 25px;
  }
</style>

