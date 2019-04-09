<template>
  <div>
    <div id="front">
      {{front}}
    </div>
    <div id="links">
      <li v-for="link in links" @click=gotoAddr(link)>
        {{link.link_name}}
      </li>
    </div>
  </div>
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
