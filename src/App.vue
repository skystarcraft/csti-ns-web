<template>
  <div id="app">
   <div v-if="$route.meta.keepAlive">
      <el-menu
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeIndex"
        router
      >
        <NavMenu :navMenus="menuData"></NavMenu>
        <el-menu-item>
          <div v-show="show" v-model='user'>
            <span>
              <img :src="user.avatar" height="50" width="50" style="border-radius:50%;" v-model='user.avatar'/>
            </span>
            <span v-model='user.name'>
              {{user.name}}
            </span>
            <span  @click="logout()">
              注销
            </span>
          </div>
        </el-menu-item>
      </el-menu>

    </div>

    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu.vue';
import Cookies from "js-cookie";


export default {
  name: "app",
  components: {
    NavMenu,
  },
  provide(){
    return{
      reload: this.reload
    }
  },
  data(){
    return{
      show: true,
      user: {
        avatar: '',
        name: ''
      },
      isRouterAlive:true,
      activeIndex: 'index',
      menuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "/index",
            icon: "el-icon-message",
            alias: "首页",
            value: { path: "/index" }
          }
        },
        {
          //一级
          entity: {
            id: 1,
            name: "artManage",
            icon: "el-icon-message",
            alias: "文章"
          },
          //二级
          childs: [
            {
              entity: {
                id: 2,
                name: "/articles",
                icon: "el-icon-loading",
                alias: "文章大全",
                value: { path: "/articles" }
              }
            },
            {
              entity: {
                id: 3,
                name: "/write/article",
                icon: "el-icon-bell",
                alias: "发布文章",
                value: "/write/article/"
              }
            },
            {
              entity: {
                id: 4,
                name: "/i/article",
                icon: "el-icon-bell",
                alias: "我的文章",
                value: "/i/article/"
              }
            },
          ]
        },

        {
          //一级
          entity: {
            id: 5,
            name: "resManage",
            icon: "el-icon-message",
            alias: "资源"
          },
          //二级
          childs: [
            {
              entity: {
                id: 6,
                name: "/resources",
                icon: "el-icon-loading",
                alias: "资源大全",
                value: { path: "/resources/" }
              }
            },
            {
              entity: {
                id: 7,
                name: "/upload",
                icon: "el-icon-bell",
                alias: "上传资源",
                value: "/upload"
              }
            },
            {
              entity: {
                id: 8,
                name: "/i/res/",
                icon: "el-icon-bell",
                alias: "我的资源",
                value: "/i/res/"
              }
            },
          ]
        },

        {
          //一级
          entity: {
            id: 9,
            name: "systemManage",
            icon: "el-icon-message",
            alias: "纳新相关"
          },
          //二级
          childs: [
            {
              entity: {
                id: 10,
                name: "/naxin",
                icon: "el-icon-loading",
                alias: "纳新报名",
                value: { path: "/hello" }
              }
            },
          ]
        },

        {
          //一级
          entity: {
            id: 11,
            name: "/pay",
            icon: "el-icon-message",
            alias: "喵币相关"
          },
          //二级
          childs: [
            {
              entity: {
                id: 12,
                name: "/xpay",
                icon: "el-icon-loading",
                alias: "喵币充值",
                value: { path: "/xpay/" }
              }
            },
          ]
        },

        {
          //一级
          entity: {
            id: 13,
            name: "/myself",
            icon: "el-icon-message",
            alias: "个人信息"
          }
        },
      ]
    }
  },
  mounted(){
    this.getUser()
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    },
    getUser() {
      var token = Cookies.get('token');
      this.$api.get('/sso/user/token/' + token).then(res => {
        if (res.data.code === 200) {
          this.user.avatar = res.data.data.user_image;
          this.user.name = res.data.data.user_name;
          this.show = true;
        } else {
          Cookies.remove('token');
          Cookies.remove('user');
          // this.$message.error("请重新登录！");
          this.$router.push({name: 'login'})
        }
      })
    },
    logout() {
      var token = Cookies.get('token');
      this.$api.get('/sso/user/logout/' + token).then(res => {
          Cookies.remove('token');
          Cookies.remove('user');
          this.$router.push({name: 'login'});
      })
    },
  }
};
</script>

<style>
*{
  outline:none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
