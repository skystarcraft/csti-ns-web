<template>
  <div>
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
            console.log(res.data.data);
          } else {
            Cookies.remove('token');
            Cookies.remove('user');
            this.$message.error("请重新登录！");
            // this.$router.push({name: 'login'})
          }
        })
      },
      alipay(pay) {
        var uid = Cookies.get('user');
        var money = pay.rmb;
        this.$api.get('/pay/xpay/pay/' + uid + '/' + money).then(res => {
          // this.$router.push({name: 'alipay', params: {data: res.data}});
          let routerData = this.$router.resolve({path: '/alipay', query: {htmls: res.data}})
          this.htmls = res.data;
          const div = document.createElement('div') // 创建div
          div.innerHTML = res.data // 将返回的form 放入div
          document.body.appendChild(div)
          document.forms[0].submit()
        })
      }
    }
  }
</script>
