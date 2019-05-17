<template>
  <div>
    <div>
      <el-form ref="form" :model="form">
        <el-input v-model="form.search" placeholder="请输入搜索内容"
                  suffix-icon="el-icon-search" style="width: 40%"></el-input>
        <el-button type="primary" @click.native="searchArticle(form)">搜索</el-button>
      </el-form>
    </div>
    <div>
      <div style="text-align: left;padding:0 180px;">
        <div class="eachArticle" v-for="article in articles" :key="article.adate" @click="getOneArticle(article)">
          <h3>{{article.article_title}}</h3>
          <div style="display:flex;color: #ccc">
            <div>{{article.adate.replace('T',' ').replace('\.000+0000','')}}</div>
            <div style="margin-left: auto;">阅读：{{article.article_view}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Articles',
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
          } else {
            Cookies.remove('token');
            Cookies.remove('user');
            this.$message.error("请重新登录！");
            this.$router.push({name: 'login'})
          }
        })
      },
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
        // this.$router.push({name: 'article',params: {aid: article.aid, fordward: true}})
        this.$router.push({path: '/article/' + article.aid, query: {aid: article.aid, fordward: true}})
      },
      searchArticle(form) {
        if (form.search === '') {
          window.location.reload();
        } else{
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
  }
</script>

<style>
#article {
  height: 500px;
  width: 1400px;
  /* margin: 10px; */
}
.eachArticle {
  /* height: 50px;
  width: 800px; */
  margin-top: 20px;
  padding: 10px;
  /* background-color: aqua; */
}
</style>
