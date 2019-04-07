<template>
  <div>
    <div>我的喵币： {{score}}</div>
    <div id="res">
      <li v-for="resource in resources" @click="getOneRes(resource)">{{resource}}</li>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Resources',
    data() {
      return {
        resources: null,
        form: {
          search: ''
        },
        score: ''
      }
    },
    mounted() {
      this.getUser();
      this.getResList();
    },
    methods: {
      getUser() {
        var token = Cookies.get('token');
        this.$api.get('/sso/user/token/' + token).then(res => {
          if (res.data.code === 200) {
            this.uid = res.data.uid;
            this.score = res.data.data.uintegral;
            // console.log(res.data.data);
          } else {
            Cookies.remove('token');
            Cookies.remove('user');
            this.$message.error("请重新登录！");
            this.$router.push({name: 'login'})
          }
        })
      },
      getResList () {
        this.$api.get('/res/allres').then(res => {
          if (res.data.code === 200) {
            this.resources = res.data.data;
            // console.log(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      getOneRes(resource) {
        this.$router.push({name: 'resource',params: {rid: resource.rid, fordward: true}})
      },
    }
  }
</script>
