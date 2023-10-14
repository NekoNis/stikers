<script setup>
import Item from './Object.vue'
import {onMounted, ref, reactive} from "vue";
import {get_pos} from "@/helpers/get_coordinates";

/*
изучить:
  жизненный цикл компонентов
  react.js
  ! canvas
  async await (js)
  ES
  чистые функции
  javascript - arrays
  StckersCalculator 20/366
  drawImage(image, dx, dy)
*/

const objects = reactive([
    {uniqueID: ref(), parentID: ref(), url: ref(""), size: {x: ref(), y: ref()}}
]);

const exportDataImages = reactive(
    [{id: ref(), size: {x: ref(), y: ref()}}]
);
const exportDataCanvas = reactive(
    {size: {x: ref(), y: ref()}, space: ref()}
);
const count = ref(0)
const loaded = ref(true)
const importData = get_pos(
    2,
    1285,
    650,
    [
      ["1", 150, 150],["2", 150, 150],["3", 150, 150],
      ["4", 150, 150],["5", 150, 150],["6", 150, 150],
      ["7", 150, 150],["8", 150, 150],["9", 150, 150]
    ]
)

const draw = () => {
  let canvas = document.getElementById("main-field");
  let ctx = canvas.getContext("2d");

  for (let i = 0; i < importData.length; i++) {
    ctx.fillRect(importData[i][1], importData[i][2], 150, 150);
  }
}

</script>

<template>
  <main>
    <template v-if="loaded === false">
      <button @click="loaded = true">ема...</button>
      <div class="input-wrapper-first">
        <input type="file" id="input-file" class="input-hidden" style="width: 0;" accept=".jpg, .jpeg, .png">
        <label for="input-file" class="input-styled">
          <span class="icon-input"><img class="input-icon" src="./icons/IconUpload.svg" alt="Выбрать файл"></span>
        </label>
      </div>
    </template>
    <template v-else-if="loaded === true">
      <div class="load-objects">
        <div class="images">
          <!-- Example of object -->
          <Item v-for="i in 10">
            <template #name>name.png</template>
            <template #size>128x128</template>
          </Item>
        </div>
        <div class="input-wrapper-second">
          <input type="file" id="input-file" class="input-hidden" style="width: 0;" accept=".jpg, .jpeg, .png">
          <label for="input-file" class="input-styled">
            <span class="icon-input"><img class="input-icon" src="./icons/IconUpload.svg" alt="Выбрать файл"></span>
          </label>
        </div>
      </div>
    </template>
  </main>
  <section>
    <!-- There will be stickers here soon -->
    <canvas id="main-field" width="1285" height="650" @click="draw"></canvas>
  </section>
</template>


<style scoped>
  #main-field {
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid gray;
  }
  /* style */
  .load-objects {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 720px;
  }
  .images {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 650px;
    background-color: #dbdce0;
    overflow-y: scroll;
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
    position: absolute;
    top: 650px;
    left: 0;
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

