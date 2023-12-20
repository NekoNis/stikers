import './assets/main.css'
import { default as tracer } from './utils/tracer';
import {createApp, reactive, ref} from 'vue'
import App from './App.vue'

export const objects = ref([])
export const multiply = ref(0)

// Информация о холсте
export const list = reactive({
    space: ref(5),
    listX: ref(602),
    listY: ref(0),
    outputSVG: ref(false)
})

export default {
    tracer,
}


createApp(App).mount('#app')
