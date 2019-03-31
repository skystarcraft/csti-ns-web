import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login/login.vue";
import Articles from "./views/articles/articles.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    }
  ]
})
