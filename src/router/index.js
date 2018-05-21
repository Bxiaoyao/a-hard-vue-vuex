import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '@/config/env'
import App from '@/App'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')

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
        {// 登录注册页
          path: '/login',
          component: login
        },
        {// 修改密码页
          path: '/forget',
          component: forget
        },
        {// 当前选择城市页
          path: '/city/:cityid',
          component: city
        },
        {// 所有商铺列表页
          path: '/msite',
          component: msite,
          meta: {
            keepAlive: true
          }
        },
        {// 商铺详情页
          path: '/shop',
          component: shop
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
