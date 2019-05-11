<template>
  <div style="padding: 0 100px" v-model="articles">
    <div id="res">
      <el-table
      :data="articles"
      border
      style="width: 100%">
      <el-table-column
        prop="article_title"
        label="名称"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="article_view"
        label="阅读量"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="adate"
        align="center"
        label="发布时间"
        width="360">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="480">
        <template slot-scope="scope">
          <el-button @click.native="getOneArticle(scope.row)" type="primary">查看</el-button>
          <el-button @click.native="delArticle(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
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
      getOneArticle(article) {
        this.$router.push({name: 'article',params: {aid: article.aid, fordward: true}})
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
