<template>
  <div>
    <div id="search">
      <el-form ref="form" :model="form">
        <el-input v-model="form.search" placeholder="请输入搜索内容"
                  suffix-icon="el-icon-search" style="width: 40%"></el-input>
        <el-button type="primary" @click.native="searchArticle(form)">搜索</el-button>
      </el-form>
    </div>
    <div id="articles">
      <li v-for="article in articles" @click="getOneArticle(article)">{{article}}</li>
    </div>
  </div>
</template>

<script>
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
