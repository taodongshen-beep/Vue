import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//路由
import Login from "../components/Login.vue"
import Ok from "../components/Ok.vue"
import User from "../components/User.vue"
import Welcome from "../components/Welcome.vue"
import Test from "../components/Test.vue"

Vue.use(Router)

const routes = [ {
  path:"/",
  name:"Login",
  component:Login
}, {
  path:"/ok",
  name:"Ok",
  component:Ok,
  children:[
    {
      path:"/welcome",
      name:"Welcome",
      component:Welcome
    },
    {
      path:"/user",
      name:"User",
      component:User
    },
    {
      path:"/test",
      name:"Test",
      component:Test
    }
  ]
}]
const router = new Router({
  mode:'history',
  base:process.env.BASE_URL,
  routes
})

// // 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
// //如果去往登录页则放行
//   if (to.path === '/') {
//     next();
//   } else {
//     // 从本地存储里获取token
//     let token = sessionStorage.getItem('token');
//     // 判断token是否为空如果为空则跳转到登录页 如果有则放行
//     if (token === null || token === '') {
//       next({path:'/'});
//     } else {
//       next();
//     }
//   }
// });

export default router



// export default new Router({
//   routes: [
    // {
    //   path: '/',  //路径
    //   name: 'TestVue',  //组件名称
    //   component: TestVue  //改路径下的文件
    // },
//     {
//       path: "/",
//       name: "Login",
//       component: Login
//     },
//     {
//       path: "/ok",
//       name: "Ok",
//       component: Ok
//     }
//   ]
// })
