// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import ElementUI from "element-ui"
import "./assets/all.css"
//全局引入
import "element-ui/lib/theme-chalk/index.css"

//请求url设置
axios.defaults.baseURL = "http://localhost:8888"
//配置axios对应属性
Vue.prototype.$http = axios

//将ui放入vue对象
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (sessionStorage.getItem("token")) {
    config.headers.Authorization = sessionStorage.getItem("token");
  }
  return config
}, function (error) {
  router.push('/')
  return Promise.reject(error)
})
