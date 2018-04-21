import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '@/config/env'
import App from '@/App'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: App, // 顶层路由，对应index.html
      children: [ // 二级路由，对应App.vue
        {// 地址为空时跳转home页面
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          component: home
        },
        {//登录注册页
          path: '/login',
          component: login
        }
      ]
    }
  ],
  mode: routerMode, // 配置路由模式
  scrollBehavior (to, from, savedPosition) { // 自定义路由切换时页面如何滚动
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
