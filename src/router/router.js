import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Index from '@/views/Index.vue'
import Personal from '@/views/Personal.vue'
import Editprofile from '@/views/Editprofile.vue'
import NewsMain from '@/views/NewsMain.vue'
import Attention from '@/views/Attention.vue'
import Collect from '@/views/Collect.vue'
import Comments from '@/views/Comments.vue'
Vue.use(VueRouter)
var router = new VueRouter({
  routes: [
    {
      name: 'index',
      path: '/',
      component: Index
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'newsmain',
      path: '/newsmain/:id',
      component: NewsMain
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'personal',
      path: '/personal/:id',
      component: Personal
    },
    {
      name: 'editprofile',
      path: '/editprofile/:id',
      component: Editprofile
    },
    {
      name: 'attention',
      path: '/attention',
      component: Attention
    },
    {
      name: 'Collect',
      path: '/collect',
      component: Collect
    },
    {
      name: 'Comments',
      path: '/comments/:id',
      component: Comments
    }
  ]
})

// 添加导航守卫
// to:目标路由对象
router.beforeEach((to, from, next) => {
  // 只有访问那些需要授权的api的时候，才需要进行守卫
  if (to.path.indexOf('/personal/') === 0) {
    // 判断当前用户是否登陆过
    let token = localStorage.getItem('heima_40_token')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
