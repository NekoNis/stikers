<script setup>
import Test from './components/Test.vue';
import { get_pos } from './helpers/get_coordinates.js';

const x_list = 230; // px
const y_list = 130; // or 1000 px
const space = 5;
const list_size = [['1', 100, 100], ['2', 100, 100], ['3', 100, 100], ['4', 100, 100], ['5', 100, 100], ['6', 100, 100], ['7', 100, 100]];

let cord = get_pos(space, x_list, y_list, list_size);
console.log(cord)

</script>

<template>
  <main>
    <Test />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
