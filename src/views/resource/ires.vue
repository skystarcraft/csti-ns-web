<template>
  <div v-model="resource">
    <el-form ref="resource" v-model="resource">
      <li v-for="resource in resources">
        {{resource}}
        <el-button type="primary" @click.native="delResource(resource)">删除</el-button>
      </li>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'IRes',
    data() {
      return {
        resources: [],
        comments: null,
        resource: {
          rid: '',
          rname: '',
          rscore: '',
          rdownload: '',
          ruid: '',
          raddr: '',
        },
      }
    },
    mounted() {
      this.getResource();
      this.getUser();
    },
    methods: {
      getResource() {
        var uid = Cookies.get('user');
        this.$api.get('/res/my/res/' + uid).then(res => {
          if (res.data.code === 200) {
            this.resources = res.data.data;
          } else {
            this.$message.error(res.data.msg);
            article = null;
          }
        })
      },
      getUser() {
        var token = Cookies.get('token');
        this.$api.get('/sso/user/token/' + token).then(res => {
          if (res.data.code === 200) {
            this.uid = res.data.uid;
            console.log(res.data.data);
          } else {
            Cookies.remove('token');
            Cookies.remove('user');
            this.$message.error(res.data.msg);
            this.$router.push({name: 'login'});
          }
        })
      },
      delResource(resource) {
        var uid = Cookies.get('user');
        this.$api.get('/res/res/del/' + resource.rid).then(res => {
          if (res.data.code === 200) {
            this.$message(res.data.msg);
            this.getResource();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
    }
  }
</script>
