<template>
  <div>
    <div>我的喵币： {{score}}</div>
    <div id="pays">
      <li v-for="pay in pays" @click="alipay(pay)">{{pay}}</li>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'XPay',
    data() {
      return {
        pays: null,
        score: ''
      }
    },
    mounted() {
      this.getUser();
      this.getPayList();
      this.updateToken();
    },
    methods: {
      getPayList () {
        this.$api.get('/pay/xpay/prices').then(res => {
          if (res.data.code === 200) {
            this.pays = res.data.data;
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
      alipay(pay) {
        var uid = Cookies.get('user');
        var money = pay.rmb;
        this.$api.get('/pay/xpay/pay/' + uid + '/' + money).then(res => {
          this.$router.push({name: 'alipay', params: {data: res.data}});
        })
      },
      updateToken() {
        var token = Cookies.get('token');
        this.$api.get('/sso/user/update/token/' + token).then(res => {
          if (res.data.code === 200) {
            this.uid = res.data.uid;
            Cookies.remove('user');
            Cookies.set('user', res.data.data.uid);
            console.log(res.data.data);
          } else {
            // this.$message.error("请重新登录！");
            console.log("更新token失败！");
          }
        })
      }
    }
  }
</script>
