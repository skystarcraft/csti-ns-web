<template>
 <div id="app">
  <div>
    <div style="display:flex; width: 100%;" direction="vertical">
      <div style="width: 16%;" v-if="$route.meta.keepAlive">
        <div id="bg">
          <img src="./assets/qrcode.png" />
          <div id="clock">
            <p class="date" v-model='date'>{{ date }}</p>
            <p class="time" v-model='time'>{{ time }}</p>
          </div>
        </div>
      </div>
      <div style="width: 88%">
        <el-header style="width: 100%;height: 10%;padding: 0px">
        <div v-if="$route.meta.keepAlive">
            <el-menu
              mode="horizontal"
              background-color="#3B99FC"
              text-color="#fff"
              active-text-color="#2676E3"
              :default-active="activeIndex"
              router
            >
              <NavMenu :navMenus="menuData"></NavMenu>
              <el-menu-item style="float:right">
                <div v-show="show" v-model='user'>
                  <el-dropdown>
                    <span>
                      <img :src="user.avatar" height="50" width="50" style="border-radius:50%;" v-model='user.avatar'/>
                    </span>
                    <span v-model='user.name' style="color: white">
                      {{user.name}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="open('iArticle')">我的文章</el-dropdown-item>
                      <el-dropdown-item @click.native="open('collection')">我的收藏</el-dropdown-item>
                      <el-dropdown-item @click.native="open('iRes')">我的资源</el-dropdown-item>
                      <el-dropdown-item @click.native="open('myself')">个人信息</el-dropdown-item>
                      <el-dropdown-item @click.native="logout()">注销</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-menu-item>
            </el-menu>
          </div>
        </el-header>
          <router-view style="min-height: 676px" class="clear" v-if="isRouterAlive"></router-view>
      </div>
     </div>
     <div style='clear:both'></div>
  </div>
  <div class="footer" v-if="$route.meta.keepAlive">©CSTI 版权所有</div>
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
      time: '',
      date: '',
      week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
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
      ]
    }
  },
  created(){
    this.getUser()
    setInterval(()=> {
      var cd = new Date();
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
    }, 1000);
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
        } else {
          Cookies.remove('token');
          Cookies.remove('user');
          // this.$message.error("请重新登录！");
          this.$router.push({name: 'login'})
        }
      })
      this.user.avatar = localStorage.user_image;
      this.user.name = localStorage.user_name;
    },
    logout() {
      var token = Cookies.get('token');
      this.$api.get('/sso/user/logout/' + token).then(res => {
          Cookies.remove('token');
          Cookies.remove('user');
          localStorage.setItem('setUser_image', '')
          localStorage.setItem('setUser_name', '')
          this.$store.commit('remove')
          this.$router.push({name: 'login'});
      })
    },
    open(route) {
      this.$router.push({name: route});
    },
    zeroPadding(num, digit) {
        var zero = '';
        for(var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }
  },
};
</script>

<style>
*{
  outline:none;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* height: 90px; */
  /* margin-top: 0px; */
}
.el-menu li {
    list-style: none;
    width: 15%;
}
.el-submenu__title {
    font-size: 14px;
    color: #303133;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
#bg {
  height: 100%;
  padding: 50px 0;
  width: 100%;
  background: #545c64;
   z-index: 1;
}
  #clock {
    font-family: 'Share Tech Mono', monospace;
    /* height: 100%; */
    background-size: 100%;
    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 8%;
    top: 30%;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
  }
  #clock .time {
    letter-spacing: 0.05em;
    font-size: 40px;
    padding: 5px 0;
  }
  #clock .date {
    letter-spacing: 0.1em;
    font-size: 24px;
  }
  #clock .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }
  .clear{ clear:both}
  .footer {
    height: 100px;
    width: 100%;
    margin-top: 100px;
    color: #ccc;
    line-height: 80px;

    position: absolute;
    font-size: 12px;
    z-index: 3;
    /* bottom: 0; */
    background-color: #303133;
  }
</style>
