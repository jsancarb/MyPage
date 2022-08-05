import { createApp } from 'vue'
import App from './App.vue'
import mIcon from '@/components/m-icon.vue'

createApp(App)
  .component('m-icon', mIcon)
  .mount('#app')
