<script setup>
import Item from './Object.vue'
import {onMounted, ref} from "vue";

const objects = ref()
const count = ref(1)
const loaded = ref(false)
function countMinusFunc(event) {if (event) {if (count.value != 0) {count.value--}}}
/*
изучить:
  жизненный цикл компонентов
  react.js
*/

onMounted(() => {
  count.value;

  let inputFiles = document.getElementById("input-file")
  inputFiles.addEventListener('change', event => {
    // Очищаем body от возможных старых имён файлов
    [...document.body.children].slice(1).map(i=>i.remove());
    // Добавляем новые имена файлов
    [...event.target.files].map(i=>{
      let newp = document.createElement('p');
      newp.innerText = i.name;
      document.body.append(newp);
    })
  });
})

</script>

<template>
  <main>
    <template v-if="loaded === false">
      <button @click="loaded = true">ема...</button>
      <div class="input-wrapper-first">
        <input type="file" id="input-file" class="input-hidden" style="width: 0;" accept=".jpg, .jpeg, .png" multiple>
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
        <div class="input-wrapper-second">
          <input type="file" id="input-file" class="input-hidden" style="width: 0;" accept=".jpg, .jpeg, .png" multiple>
          <label for="input-file" class="input-styled">
            <span class="icon-input"><img class="input-icon" src="./icons/IconUpload.svg" alt="Выбрать файл"></span>
          </label>
        </div>
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
    background-color: #000;
  }

  .input-hidden {
    opacity: 0;
    visibility: hidden;
  }

  .input-wrapper-first {
    background-color: rgb(204 0 0);
    position: absolute;
    left: 50px;
    top: 50px;
    width: 400px;
    height: 100px;
    border-radius: 40px;
  }

  .icon-input {
    width: 100%;
    height: 100%;
  }

  .input-wrapper-first .icon-input {
    position: absolute;
  }

  .input-wrapper-first .input-icon {
    position: relative;
    display: flex;
    margin: auto;
    width: 50px;
    top: 25px;
  }

  .input-wrapper-second {
    background-color: rgb(204 0 0);
    position: relative;
    height: 70px;
    width: 100%;
    margin-top: 1px;
  }

  .input-wrapper-second .input-icon {
    position: relative;
    display: flex;
    margin: auto;
    width: 30px;
  }
</style>

