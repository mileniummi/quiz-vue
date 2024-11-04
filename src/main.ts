import { createApp } from 'vue';
import './style.css';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import App from './app/App.vue';
import router from '~/app/router/model/router.ts';

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueQueryPlugin)
  .mount('#app');
