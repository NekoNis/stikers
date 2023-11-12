<!--
TODO
 изучить:
  жизненный цикл компонентов
  react.js
  async await (js)
  ES
  StickersCalculator 20/366
  при наведении выводить полное название файла (title)
  фильтры
-->


<template>
  <div class="stickers-calculator">
    <nav>
      <!-- Objects.vue -->
      <div class="objects">
        <!-- Example of object -->
        <Item v-for="i in count" :id-export="objects[i-1][0]" :image-export="objects[i-1][1]" :name-export="objects[i-1][2]" :ext-export="objects[i-1][3]" :sizeX-export="objects[i-1][4]" :sizeY-export="objects[i-1][5]"></Item>
      </div>

      <div class="input-wrapper">
        <input type="file" id="input-file" style="width: 0;" accept=".jpg, .jpeg, .png" @change="readFile">
        <label for="input-file" class="input-styled">
          <span class="icon-input">Загрузить новый стикер</span>
        </label>
      </div>
    </nav>

    <main>
      <div class="border-field">
        <template v-if="list.listY == 0">
          <canvas id="field" :width="10000" :height="list.listX"></canvas>
        </template>
        <template v-else>
          <canvas id="field" :width="list.listY" :height="list.listX"></canvas>
        </template>
      </div>
      <div class="calculator-panel">
        <div class="button-calculator">
          <button id="place-an-image" @click="draw">Рассчитать</button>
          <button id="send-to-prod">Отправить</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>

import Item from './Object.vue'
import {ref, reactive} from "vue";
//import {get_pos1, get_pos2} from "@/utils/get_coordinates";
import { get_pos1 } from "@/utils/test.js";
import { pxInMm } from "@/utils/pxInMm";
import "@/utils/canvas2svg";
// import * as saveSvgAsPng from "https://cdn.skypack.dev/save-svg-as-png@1.4.17";
import { default as tracer } from '@/utils/tracer';


// Информация о холсте
const list = reactive({
  space: ref(5),
  listX: ref(10000),
  listY: ref(0),
  outputSVG: ref(false)
})
const count = ref(0)

// Список данных всех загруженных изображений
const objects = ref([])

// Список данных, которые пойдут на обработку
const exportData = ref([])

// Список обработанных данных
const importData = ref([]) // [id.string, positionX:int, positionY:string]

let props = defineProps( {
  countImport: Number,
  idImport: String,
  sizeXImport: Number,
  sizeYImport: Number,
})

const dataImage = reactive({
  idImage: props.idImport,
  countImage: props.countImport,
  widthImage: props.sizeXImport,
  heightImage: props.sizeYImport,
})



const draw = () => {
  tracer.debug('draw called');
  let canvas = document.getElementById("field");
  let ctx = canvas.getContext("2d");
  importData.value = get_pos1(list.space, list.listX, list.listY, exportData.value);
  if (importData.value.length > 0) { list.outputSVG = true }
  for (let i = 0; i < importData.value.length; i++) {
    var img = new Image();
    img.src = objects.value[i][1];
    img.width = img.width * pxInMm();
    img.height = img.height * pxInMm();
    //console.log(img)
    ctx.drawImage(img, importData.value[i][1], importData.value[i][2], img.width, img.height);
  }
}

const readFile = (event) => {
  tracer.debug('readFile called');
  //let inputFile = document.getElementById('input-file');
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    let imageURL
    reader.onerror = () => reject(new DOMException("Problem parsing input file."))
    reader.onload = () => resolve(imageURL = reader.result)
    reader.onloadend = () => {
      var image = new Image();
      image.src = imageURL;
      image.onload = () => {
        var fileExtension = event.target.files[0]['name'].split('.').at(-1);
        var fileName = event.target.files[0]['name'].slice(0, ((fileExtension.length * -1) - 1));
        var sizeX = image.width * pxInMm();
        var sizeY = image.height * pxInMm();
        exportData.value.push([count.value, sizeX, sizeY]);
        objects.value.push([count.value, image.src, fileName, fileExtension, sizeX, sizeY]);
        count.value++;
        //draw();
      }
    }
    reader.readAsDataURL(event.target.files[0])});
}

</script>

<style scoped>

.stickers-calculator {
  display: flex;
}

nav {
  width: 400px;
  height: 100vh;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
}

.objects {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex: auto;
  background-color: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--gray-color);
  margin-bottom: 10px;
}

.input-wrapper {
  align-self: flex-end;
  display: flex;
  margin-top: 10px;
}

.input-styled {
  display: flex;
  background-color: var(--red-color);
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 400px;
  height: 80px;
  cursor: pointer;
}

.icon-input {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: white;
}



main {
  display: flex;
  flex-direction: column;
  flex: auto;
  margin-left: 10px;
}

.border-field {
  width: calc(100vw - 420px);
  height: calc(100vh - 100px);
  background-color: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--gray-color);
  overflow-x: scroll;
}

#field {
  margin: 20px;
  height: calc(100% - 40px);
  background-color: white;
}

.calculator-panel {
  justify-content: flex-end;
  margin-top: 20px;
  align-self: flex-end;
  display: flex;
  width: 100%;
  height: 80px;
}

.button-calculator {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button-calculator button {
  border: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  height: 30px;
  width: 125px;
  margin-right: 10px;
  margin-top: 3px;
  margin-bottom: 3px;
  background-color: var(--red-color);
  border-radius: 4px;
}

</style>