<script setup>
/* -----------------------------------------------------IMPORTS----------------------------------------------------- */
import Item from './Object.vue'
import {ref, reactive} from "vue";
import {get_pos1, get_pos2} from "@/helpers/get_coordinates";
import "@/helpers/canvas2svg";
import * as saveSvgAsPng from "https://cdn.skypack.dev/save-svg-as-png@1.4.17";

/*---------------------------------------------------FOR LEARNING--------------------------------------------------- */
/*
изучить:
  жизненный цикл компонентов
  react.js
  ! canvas
  async await (js)
  ES
  чистые функции
  javascript - arrays
  StickersCalculator 20/366
  drawImage(image, dx, dy)
  <str>.split("-")
  uniqueID = "id-count"
  for (var i = 0; i < id.split("-")[1]; i++) { code... }
  user width and height (cm)
  шаблоны проектирования
*/




/* ----------------------------------------------------VARIABLES---------------------------------------------------- */
const space = ref(5)
const listX = ref(1285)
const listY = ref(0)
const count = ref(0)
const loaded = ref(true)
const outputSVG = ref('a')

// const objects = reactive([{id: '', image: '', name: '', sizeX: 0, sizeY: 0}])

let objects = [] // [[id:string, imageURL:string, name:string, sizeXY:string]]

let exportData = [space.value, listX.value, listY.value, []] // [space:int, listX:int, listY:string, [id:string, sizeX:int, sizeY:int]]
let importData = [] // [id.string, positionX:int, positionY:string]

defineProps({
  idImport: String,
})



/* ----------------------------------------------------FUNCTIONS---------------------------------------------------- */

// This function draw all got images on canvas
const draw = () => {
  let canvas = document.getElementById("main-field");
  let ctx = canvas.getContext("2d");
  console.log(exportData)
  importData = get_pos2(exportData[0], exportData[1], exportData[2], exportData[3])

  for (let i = 0; i < importData.length; i++) {
    var img = new Image();
    img.src = objects[i][1]
    ctx.drawImage(img, importData[i][1], importData[i][2]);
  }
  console.log(importData)
}


const downloadCanvas = () => {
  let ctx = new C2S(listX.value, listY.value);
  importData = get_pos2(exportData[0], exportData[1], exportData[2], exportData[3]);

  for (let i = 0; i < importData.length; i++) {
    var img = new Image();
    img.src = objects[i][1];
    ctx.drawImage(img, importData[i][1], importData[i][2]);
  };
  let svg = ctx.getSvg();
  saveSvgAsPng.saveSvg(svg, "output.svg");
};

// This function only for check!
const checkFunc = () => {
}

// This function need for getting data of image
const readFile = ( inputFile ) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    let imageURL
    reader.onerror = () => reject(new DOMException("Problem parsing input file."))
    reader.onload = () => resolve(imageURL = reader.result)
    reader.onloadend = () => {
      var image = new Image();
      image.src = imageURL;
      console.log(inputFile.target.files[0])
      image.onload = () => {
        exportData[3].push([count.value.toString(), image.width, image.height])
        var name = inputFile.target.files[0]['name'];
        var size = image.width.toString() + "x" + image.height.toString();
        objects.push([count.value.toString(), image.src, name, size])
        count.value++
      }
    }
    reader.readAsDataURL(inputFile.target.files[0])});
};

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
          <Item v-for="i in count" :id-export="objects[i-1][0]" :image-export="objects[i-1][1]" :name-export="objects[i-1][2]" :size-export="objects[i-1][3]"></Item>
        </div>
        <div class="input-wrapper-second">
          <input type="file" id="input-file" class="input-hidden" style="width: 0;" accept=".jpg, .jpeg, .png" @change="readFile">
          <label for="input-file" class="input-styled">
            <span class="icon-input"><img class="input-icon" src="./icons/IconUpload.svg" alt="Выбрать файл"></span>
          </label>
        </div>
      </div>
    </template>
  </main>
  <section>
    <!-- There will be stickers here soon -->
    <canvas id="main-field" :width="listX" :height=650></canvas>
    <button @click="draw" style="position: absolute; bottom: 5px; right: 5px">Разместить</button>
    <button @click="downloadCanvas" style="position: absolute; bottom: 30px; right: 5px">Отправить</button>
    <section v-if="outputSVG == ''">
      <button @click="downloadCanvas" style="position: absolute; bottom: 5px; right: 100px" disabled>Рассчитать</button>
    </section>
    <section v-else>
      <button @click="downloadCanvas" style="position: absolute; bottom: 5px; right: 100px">Рассчитать</button>
    </section>
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
    height: 60px;
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

