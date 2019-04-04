<template>
  <div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'AlibabaPay',
    data() {
      return {
        msg: ''
      }
    },
    mounted() {
      this.toHTML();
    },
    methods: {
      toHTML() {
        this.msg = this.$route.params.data;
        console.log(this.msg);
        const div = document.createElement('div') // 创建div
        div.innerHTML = this.msg // 将返回的form 放入div
        document.body.appendChild(div)
        document.forms[0].submit()
      }
    }
  }
</script>
