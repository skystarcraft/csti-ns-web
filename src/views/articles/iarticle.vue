<template>
  <div v-model="articles">
    <el-form ref="article" v-model="article">
      <div v-for="article in articles">
        <li>{{article.article_title}}</li>
        <li>{{article.article_context}}</li>
        <li>{{article.article_view}}</li>
        <li>{{article.uid}}</li>
        <li>{{article.adate}}</li>
        <el-button type="primary" @click.native="delArticle(article)">删除</el-button>
      </div>
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
          adate: '',
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
        this.$api.get('/art/del/article/' + article.aid).then(res => {
          if (res.data.code === 200) {
            this.$message({message: "删除成功!", type: 'success'});
            this.getArticle();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
    }
  }
</script>
