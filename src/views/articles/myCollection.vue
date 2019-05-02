<template>
  <div>
    <div>
      <div style="text-align: left;padding:0 180px;">
        <div class="eachArticle" v-for="article in articles" :key="article.adate" @click="getOneArticle(article)">
          <h3>{{article.article_title}}</h3>
          <div style="display:flex;color: #ccc">
            <div>{{article.adate}}</div>
            <div style="margin-left: auto;">阅读：{{article.article_view}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="articles">
      <li v-for="article in articles" @click="getOneArticle(article)">{{article}}</li>
    </div> -->
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Collection',
    data() {
      return {
        articles: null,
        form: {
          search: ''
        },
      }
    },
    mounted() {
      this.getUser();
      this.getArticleList();
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
            this.$router.push({name: 'login'})
          }
        })
      },
      getArticleList () {
        var user = Cookies.get('user');
        this.$api.get('/art/my/collection/' + user).then(res => {
          if (res.data.code === 200) {
            this.articles = res.data.data;
            // console.log(res.data.data);
          } else {
            articles = res.data.msg;
          }
        })
      },
      getOneArticle(article) {
        this.$router.push({name: 'article',params: {aid: article.aid, fordward: true}})
      },
    }
  }
</script>
