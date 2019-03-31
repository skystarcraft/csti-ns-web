import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import { Button, Select } from 'element-ui';
import '@/assets/theme/index.css'
import axios from 'axios'
import Global from "./utils/global.js";

Vue.use(ElementUI)
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.config.productionTip = false
Vue.prototype.$api = axios;
Vue.use(Global)



new Vue({
  el: '#app',
  render: h => h(App),
  router,
}).$mount('#app')
