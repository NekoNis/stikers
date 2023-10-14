<script setup>
import Item from './Object.vue'
import {onMounted, ref, reactive} from "vue";

/*
изучить:
  жизненный цикл компонентов
  react.js
  .map() (js)
  reactive (vue)
  ! canvas
  async await (js)
  arrow functions
  ES
  чистые функции
  javascript - arrays
  StckersCalculator 20/366
*/

const objects = reactive([
    {uniqueID: ref(), parentID: ref(), url: ref(""), size: {x: ref(), y: ref()}}
])

const exportData = reactive(
    [{id: ref(), size: {x: sizeImage[0].value, y: sizeImage[1].value}}],
    {size: {x: sizeCanvas[0].value, y: sizeCanvas[1].value}}, {space: space.value}
)

let space = ref(0)
let sizeImage = ref([1, 1])
let sizeCanvas = ref([1, 1])
let count = ref(1)
let id = ref(1)
const fileName = ref('')
const loaded = ref(false)
function countMinusFunc(event) {
  if (event) {
    if (count.value != 0) {
      count.value--
    }
  }
}

function countPlusFunc(event) {
  if (event) {
    count.value++
  }
}

const inputFile = document.getElementById("input-file")
const readFileAsDataFromInput = ( inputFile ) => {
  return new Promise(( resolve, reject ) => {
    if ( inputFile.files && inputFile.files[ 0 ] ) {
      const reader = new FileReader()
      reader.onload = function ( event ) {
        resolve( event.target.result )
      }
      reader.readAsDataURL( inputFile.files[ 0 ] )
    } else {
      reject()
    }
  } )
}

// onMounted(() => {}









//     inputFile.addEventListener('change', event => {
//
//       let file = inputFile.files[0];
//       const image = new Image();
//       image.src = window.URL.createObjectURL();
//       console.log(image.src);
//       // Добавляем новые имена файлов
//       [...event.target.files].map(nameFile=>{
//         exportData.push({
//           id: id.value,
//           size: {
//             x: 1,
//             y: 1
//           }
//         });
//     })
//   });
// })

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
        <!-- Example of object -->
        <Item v-for="i in 10">
          <template #name>name.png</template>
          <template #size>128x128</template>
        </Item>
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
    <canvas id="main-field"></canvas>
  </section>
</template>


<style scoped>
  /* style */
  .load-objects {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
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

