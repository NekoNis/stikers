import './assets/main.css'
import { default as tracer } from './utils/tracer';
import {createApp, ref} from 'vue'
import App from './App.vue'

export const objects = ref([])


export default {
    tracer,
}


createApp(App).mount('#app')
