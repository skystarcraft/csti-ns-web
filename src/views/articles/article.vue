<template>
  <div>
    <div id="article" v-model="article">
      <li>{{article.article_title}}</li>
      <li>{{article.article_context}}</li>
      <li>{{article.article_view}}</li>
      <li>{{article.uid}}</li>
      <li>{{article.article_date}}</li>
    </div>
    <div id="comments">
      <li v-for="comment in comments">{{comment}}</li>
    </div>

    <el-form ref="comment" :model="comment">
        <el-form-item>
          <el-input placeholder="发布评论" v-model="comment"></el-input>
        </el-form-item>
      <el-form-item size="large" class="me-login-button">
        <el-button type="primary" @click.native="writeComment(comment)">发布评论</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Article',
    data() {
      return {
        article: {
          aid: null,
          article_title: null,
          article_context: null,
          article_view: null,
          uid: null,
          article_date: null,
        },
        comments: {},
        comment: {
          aid: '',
          uid: '',
          article_context: '',
          cdate: ''
        }
      }
    },
    mounted() {
      this.getUser();
      this.getArticle();
      this.getComments();
    },
    methods: {
      getArticle() {
        var isFordward = this.$route.params.fordward;
        var aid = this.$route.params.article_id;
        this.$api.get('/art/article/' + aid).then(res => {
          if (res.data.code === 200) {
            this.article.aid = res.data.data.article_id;
            this.article.article_title = res.data.data.article_title;
            this.article.article_context = res.data.data.article_context;
            this.article.article_view = res.data.data.article_view;
            this.article.uid = res.data.data.uid;
            this.article.article_date = res.data.data.article_date;
            console.log(res.data.data);
          } else {
            alert(res.data.msg);
            article = null;
          }
        })
      },
      getComments() {
        var isFordward = this.$route.params.fordward;
        var aid = this.$route.params.article_id;
        this.$api.get('/acom/comment/' + aid).then(res => {
          if (res.data.code === 200) {
            this.comments = res.data.data;
            // console.log(res.data.data);
          } else {
            article = res.data.msg;
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
            alert(res.data.msg);
          }
        })
      },
      writeComment(comment) {
        var uid = Cookies.get('user');
        this.$api.post('/acom/comment', {
          aid: this.article.aid,
          article_context: comment.article_context,
          uid: uid
        }).then(res => {
          if (res.data.code === 200) {
            alert(res.data.msg);
            console.log(res.data.data);
          } else {
            alert(res.data.msg);
          }
        })
      }
    }
  }
</script>
