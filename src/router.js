import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login/login.vue";
import Articles from "./views/articles/articles.vue"
import Article from "./views/articles/article.vue"
import Register from "./views/login/register.vue"
import WriteArticle from "./views/articles/writeArticle.vue"
import IArticle from "./views/articles/iarticle.vue"
import XPay from "./views/pay/xpay.vue"
import AlibabaPay from "./views/pay/alibabapay.vue"
import Home from "./views/home.vue"

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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/article/:article_id',
      name: 'article',
      component: Article
    },
    {
      path: '/write/article/',
      name: 'writeArticle',
      component: WriteArticle
    },
    {
      path: '/i/article/',
      name: 'iArticle',
      component: IArticle
    },
    {
      path: '/xpay/',
      name: 'xpay',
      component: XPay
    },
    {
      path: '/alipay/',
      name: 'alipay',
      component: AlibabaPay
    },
    {
      path: '/index/',
      name: 'index',
      component: Home
    }
  ]
})
