<template>
  <div id="nx">
    <h1>报名须知</h1>
    <p></p>
    <el-button type="primary" @click.native="nx()">我要报名</el-button>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Naxin',
    data() {
      return {

      }
    },
    mounted() {
      this.getUser();
    },
    methods: {
      getUser() {
        var token = Cookies.get('token');
        this.$api.get('/sso/user/token/' + token).then(res => {
          if (res.data.code === 200) {
            this.uid = res.data.uid;
          } else {
            Cookies.remove('token');
            Cookies.remove('user');
            this.$message.error(res.data.msg);
            this.$router.push({name: 'login'})
          }
        })
      },
      nx () {
        var uid = Cookies.get('user');
        this.$api.get('/front/naxin/' + uid).then(res => {
          if (res.data.code === 200) {
            this.$message({message: res.data.msg, type: 'success'});
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
    }
  }
</script>
