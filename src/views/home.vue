<template>
  <el-container style="height: 100%">
  <el-main>
  <div>
    <div id="front">
      <div style="width: 80%; text-align:left;">
        {{front.introduction}}
      </div>
    </div>
    <div id="links">
      <el-row :gutter="12">
        <el-col v-for="link in links" @click.native='gotoAddr(link)' :key="link.link_name" :span="4">
          <el-card class="model_page" shadow="hover">
            {{link.link_name}}
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
  </el-main>
  </el-container>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Home',
    data() {
      return {
        front: {
          introduction: '',
          group_code:'',
          gzh: '',
          start: '',
          end: ''
        },
        links: ''
      }
    },
    mounted() {
      this.getUser();
      this.getFrontInfo();
      this.getLinks();
    },
    methods: {
      getFrontInfo() {
        this.$api.get('/front/about').then(res => {
          if (res.data.code === 200) {
            this.front = res.data.data;
            // console.log(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      getLinks() {
        this.$api.get('/front/links').then(res => {
          if (res.data.code === 200) {
            this.links = res.data.data;
            // console.log(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      test () {
        console.log(111)
      },
      getUser() {
        var token = Cookies.get('token');
        this.$api.get('/sso/user/token/' + token).then(res => {
          if (res.data.code === 200) {
            this.uid = res.data.uid;
          } else {
            Cookies.remove('token');
            Cookies.remove('user');
            this.$message.error("请重新登录！");
            this.$router.push({name: 'login'})
          }
        })
      },
      gotoAddr(url) {
        window.open(url.link_addr, '_blank');
      }
    }
  }
</script>

<style>
#links {
  margin-top: 16px;
}
  #front {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    margin-bottom: 40px;
    background: url('../img/摄图网_400062210.jpg');
    font-size: 25px;
    color: aliceblue;
    line-height: 60px;
    font-family: '幼圆';
  }
</style>

