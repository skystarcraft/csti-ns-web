<template>
  <div id="articles">
    <li v-for="article in articles" @click="getOneArticle(article)">{{article}}</li>
  </div>
</template>

<script>
  export default {
    name: 'Articles',
    data() {
      return {
        articles: null,
      }
    },
    mounted() {
      this.getArticleList();
    },
    methods: {
      getArticleList () {
        this.$api.get('/art/articles').then(res => {
          if (res.data.code === 200) {
            this.articles = res.data.data;
            // console.log(res.data.data);
          } else {
            articles = res.data.msg;
          }
        })
      },
      getOneArticle(article) {
        this.$router.push({name: 'article',params: {article_id: article.article_id, fordward: true}})
      }
    }
  }
</script>
