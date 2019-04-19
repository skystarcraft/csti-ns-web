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
import Resources from "./views/resource/resources"
import Resource from "./views/resource/resource"
import IRes from "./views/resource/ires.vue"
import UploadRes from "./views/resource/uploadres.vue"
import Myself from "./views/my/myself.vue"
import Naxin from "./views/naxin/naxin.vue"
import Collection from "./views/articles/myCollection.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/article/:article_id',
      name: 'article',
      component: Article,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/write/article/',
      name: 'writeArticle',
      component: WriteArticle,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/i/article/',
      name: 'iArticle',
      component: IArticle,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/xpay/',
      name: 'xpay',
      component: XPay,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/alipay/',
      name: 'alipay',
      component: AlibabaPay,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/index/',
      name: 'index',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/resources/',
      name: 'resources',
      component: Resources,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/resource',
      name: 'resource',
      component: Resource,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/resource/:rid',
      name: 'resource',
      component: Resource,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/i/res/',
      name: 'iRes',
      component: IRes,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadRes,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/myself',
      name: 'myself',
      component: Myself,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/naxin',
      name: 'naxin',
      component: Naxin,
      meta: {
        keepAlive: true
      }
    },{
      path: '/collection',
      name: 'collection',
      component: Collection,
      meta: {
        keepAlive: true
      }
    },
  ]
})
