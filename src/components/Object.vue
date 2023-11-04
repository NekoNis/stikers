<script setup>

import {ref, reactive} from "vue";

let linkImage = "#"
const countImage = ref(1)
const widthImage = ref(0)
const heightImage = ref(0)

defineProps( {
  idExport: String,
  imageExport: String,
  nameExport: String,
  extExport: String,
  sizeExport: String,
})

const plusFunc = (variable, factor) => {
  variable += 1 * factor;
}

const minusFunc = (variable, factor) => {
  if (variable != 0) {
    variable -= 1 * factor;
  }
}



</script>

<template>
  <div class="object">
    <div class="info-panel">
      <div class="img-image">
        <img id="picture" :src="imageExport">
      </div>
      <div class="desc">
        <div class="img-name" :class="idExport">
          <slot>{{ nameExport }}</slot>
        </div>
        <div class="img-size">
          <p><slot>{{ sizeExport }}</slot></p>
        </div>
      </div>
      <div class="data-image">
        <p class="file-extension"><slot>{{ extExport }}</slot></p>
        <button class="open-options"><img id="optionsIMG" src="./icons/options.svg" style="width: 20px;"></button>
      </div>
    </div>
<!--    <div id="options-panel" :class="showPanel">-->
<!--      <div class="option width">-->
<!--        <span id="option">Длина (мм): </span>-->
<!--        <div id="var-buttons">-->
<!--          <input v-model="widthImage" id="var-text" style="margin-right: 5px; border: 1px; text-align: center">-->
<!--          <button @click="(param1, param2, ...)=>{widthMinusFunc(); func1; func2; ...}(param1, param2, ...)" class="var-button var-minus" style="margin-right: 5px">-</button>-->
<!--          <button @click="widthPlusFunc" class="var-button var-plus" style="margin-right: 5px">+</button>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="option height">-->
<!--        <span id="option">Ширина (мм): </span>-->
<!--        <div id="var-buttons">-->
<!--          <input v-model="heightImage" id="var-text" style="margin-right: 5px; border: 1px; text-align: center">-->
<!--          <button @click="heightMinusFunc" class="var-button var-minus" style="margin-right: 5px">-</button>-->
<!--          <button @click="heightPlusFunc" class="var-button var-plus" style="margin-right: 5px">+</button>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="option count">-->
<!--        <span id="option">Количество: </span>-->
<!--        <div id="var-buttons">-->
<!--          <input v-model="countImage" id="var-text" style="margin-right: 5px; border: 1px; text-align: center">-->
<!--          <button @click="countMinusFunc" class="var-button var-minus" style="margin-right: 5px">-</button>-->
<!--          <button @click="countPlusFunc" class="var-button var-plus" style="margin-right: 5px">+</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<style scoped>
  .object {
    display: flex;
    height: 80px;
    width: 100%;
    margin-bottom: -1px;
    background-color: white;
    border: 1px solid var(--gray-color);
  }

  .info-panel {
    display: flex;
    flex: auto;
  }

  .img-image {
    flex: auto;
    width: 60px;
    max-height: 60px;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
  }

  #picture {
    max-width: 60px;
    max-height: 60px;
    border-radius: 5px;
    margin: auto;
  }

  .desc {
    flex: auto;
    height: 80px;
    display: flex;
    flex-direction: column;
  }

  .img-name {
    margin-top: 10px;
    margin-left: 10px;
    font-family: 'Open Sans', sans-serif;
    font-size: 1em;
    height: 60px;
    width: 246px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.3em;
  }

  .img-size {
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .data-image {
    display: flex;
    flex-direction: column;
  }

  .file-extension {
    display: flex;
    width: 40px;
    height: 25px;
    background-color: var(--light-gray-color);
    border: 1px solid var(--gray-color);
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    margin-right: 10px;
    margin-top: 10px;
  }

  .open-options {
    align-self: flex-end;
    margin-right: 10px;
    margin-top: 15px;
  }

</style>