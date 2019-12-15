import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import { Uploader, Toast, Dialog, Field } from 'vant'

import '@/style/reset.css'
// 挂载到vue上，全局，放便this调用$toast
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
