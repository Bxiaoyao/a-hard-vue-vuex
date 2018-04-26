// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import './config/rem'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')

/* 解决引入swiper.min.js报错：Cannot assign to read only property 'exports' of object '#<Object>'
.babelrc: ["env", {
          "modules": false,
          "targets": {
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
          }
        }]
package.json："babel-preset-env": "^1.3.2",
调整为"es2015"
*/
