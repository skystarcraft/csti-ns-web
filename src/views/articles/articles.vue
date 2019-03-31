<template>
  <div id="articles">

  </div>
</template>

<script>
  export default {
    name: 'Articles',
    data() {
      return {
        articles: {}
      }
    },
    methods: {
      beforeUpdate: function () {
        this.$api.get('/art/articles').then(res => {
          console.log(res.data);
        })
      }
    }
  }
</script>
