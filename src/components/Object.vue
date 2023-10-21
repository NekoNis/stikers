<script setup>

import {computed, ref} from "vue";

let linkImage = "#"
const countImage = ref(1)

defineProps({
  imageProp: String,
  nameProp: String,
  sizeProp: String,
})


function countMinusFunc(event) {
  if (event) {
    if (countImage.value != 0) {
      countImage.value--
    }
  }
}

function countPlusFunc(event) {
  if (event) {
    countImage.value++
  }
}

</script>

<template>
  <div class="object">
    <div class="big-picture">
      <img id="picture" v-bind:src="imageProp">
    </div>
    <span id="img-name">
      <slot name="name">{{ nameProp }}</slot>
    </span>
    <span id="img-size">
      <slot name="size">{{ sizeProp }}</slot>
    </span>
    <div class="img-count">
      <button @click="countMinusFunc" class="count-button count-minus" style="margin-right: 5px"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"></path></svg></button>
      <input v-model="countImage" id="count-text" style="margin-right: 5px; border: 1px; text-align: center">
      <button @click="countPlusFunc" class="count-button count-plus" style="margin-right: 5px"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path></svg></button>
    </div>
  </div>
</template>

<style scoped>
  .object {
    background-color: #fff;
    position: relative;
    left: 0;
    width: calc(100% - 1px);
    height: 80px;
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

  .big-picture {
    position: absolute;
    top: -40px;
    left: 5px;
    border-radius: 10px;
    width: 150px;
    height: 150px;
    background-color: #f5f7fa;
    opacity: 0;
    z-index: 1;
    visibility: hidden;
    transition-duration: .2s;
  }

  #object:hover + .big-picture {
    visibility: visible;
    opacity: 1;
  }

  .big-picture:hover {
    visibility: visible;
    opacity: 1;
  }

  .img-count {
    position: absolute;
    top: 24px;
    width: 100px;
    right: 10px;
    height: 32px;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 0 0 1px #dcdfe6;
    /*overflow: hidden; 8*/
  }

  .img-count .count-button {
    position: absolute;
    display: flex;
    align-items: center;
    align-content: center;
    height: 32px;
    width: 32px;
    border: 0;
    top: 0;
    line-height: 1em;
    background-color: #f5f7fa;
  }

  #count-text {
    position: absolute;
    left: 32px;
    right: 27px;
    height: 30px;
  }

  .count-minus {
    position: absolute;
    left: 0;
  }

  .count-plus {
    position: absolute;
    right: -5px;
  }
</style>