import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import { Uploader, Toast, Dialog, Field, Picker, Icon, Tab, Tabs, List, PullRefresh, SwipeCell, Button } from 'vant'

import '@/style/reset.css'
// 挂载到vue上，全局，放便this调用$toast
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(SwipeCell)
Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
