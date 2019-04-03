<template>
  <div v-model="articles">
    <el-form ref="article" v-model="article">
      <li v-for="article in articles">
        {{article.article_title}}
        <el-button type="primary" @click.native="delArticle(article)">删除</el-button>
      </li>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Article',
    data() {
      return {
        articles: [],
        comments: null,
        article: {
          aid: '',
          article_title: '',
          article_context: '',
          article_view: '',
          uid: '',
          article_date: '',
        },
      }
    },
    mounted() {
      this.getArticle();
      this.getUser();
    },
    methods: {
      getArticle() {
        var uid = Cookies.get('user');
        this.$api.get('/art/my/article/' + uid).then(res => {
          if (res.data.code === 200) {
            this.articles = res.data.data;
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
      delArticle(article) {
        var uid = Cookies.get('user');
        this.$api.get('/art/del/article/' + article.article_id).then(res => {
          if (res.data.code === 200) {
            this.getArticle();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
    }
  }
</script>
