<template>
  <div>
    <div id="pays">
      <el-form ref="form" :model="pays">
        <el-input v-model="pays"
                  suffix-icon="el-icon-search" style="width: 40%" @click="pay(pays)"></el-input>
      </el-form>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Pay',
    data() {
      return {
        pays: null,
      }
    },
    mounted() {
      this.getUser();
      this.getPayList();
    },
    methods: {
      getPayList () {
        this.$api.get('/art/articles').then(res => {
          if (res.data.code === 200) {
            this.articles = res.data.data;
            // console.log(res.data.data);
          } else {
            articles = res.data.msg;
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
            this.$message.error("请重新登录！");
            this.$router.push({name: 'login'})
          }
        })
      },
      pay(pays) {
        this.$api.get('/es/select/' + form.search).then(res => {
          if (res.data.code === 200) {
            this.articles = res.data.data;
            // console.log(res.data.data);
          } else {
            articles = res.data.msg;
          }
        })
      }
    }
  }
</script>
