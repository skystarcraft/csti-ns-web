<template>
  <div>
    <div id="article" v-model="article">
      <li>{{article.article_title}}</li>
      <li>{{article.article_context}}</li>
      <li>{{article.article_view}}</li>
      <li>{{article.uid}}</li>
      <li>{{article.adate}}</li>
    </div>
    <div id="comments">
      <li v-for="comment in comments">{{comment}}</li>
    </div>

    <el-button type="primary" :icon='icon' @click="collectionArticles()" v-model='icon'></el-button>

    <el-form ref="comment" :model="comment">
        <el-form-item>
          <el-input placeholder="发布评论" v-model="comment.article_context"></el-input>
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
          aid: '',
          article_title: '',
          article_context: '',
          article_view: '',
          uid: '',
          adate: '',
        },
        comments: null,
        comment: {
          aid: '',
          uid: '',
          article_context: '',
          cdate: ''
        },
        icon: 'el-icon-star-off',
        collection: false
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
        var aid = this.$route.params.aid;
        this.$api.get('/art/article/' + aid).then(res => {
          if (res.data.code === 200) {
            this.article.aid = res.data.data.aid;
            this.article.article_title = res.data.data.article_title;
            this.article.article_context = res.data.data.article_context;
            this.article.article_view = res.data.data.article_view;
            this.article.uid = res.data.data.uid;
            this.article.adate = res.data.data.adate;
            let uid = Cookies.get('user');
            let arid = this.article.aid;
            this.$api.get('/per/iscollection/' + uid + '/' + arid).then(res => {
              if (res.data.code === 200) {
                this.collection = true;
                this.icon = 'el-icon-star-on';
              } else {
                this.collection = false;
                this.icon = 'el-icon-star-off';
              }
            })
          } else {
            this.$message.error(res.data.msg);
            article = null;
          }
        })
      },
      getComments() {
        var isFordward = this.$route.params.fordward;
        var aid = this.$route.params.aid;
        this.$api.get('/acom/comment/' + aid).then(res => {
          if (res.data.code === 200) {
            this.comments = res.data.data;
            // console.log(res.data.data);
          } else {
            this.$message.error(res.data.msg);
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
            this.$message.error("请重新登录！");
            this.$router.push({name: 'login'})
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
            this.$message(res.data.msg);
            this.getComments();
            // console.log(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      collectionArticles() {
        let uid = Cookies.get('user');
        let aid = this.article.aid;
        if (this.collection) {
          this.$api.delete('/per/collection/' + uid + '/' + aid).then(res => {
            if (res.data.code === 200) {
              this.collection = false;
              this.$message({message: res.data.msg, type: 'success'});
              this.icon = 'el-icon-star-off';
            } else {
              this.$message.error(res.data.msg);
            }
        })
      } else {
          this.$api.get('/per/collection/' + uid + '/' + aid).then(res => {
            if (res.data.code === 200) {
              this.collection = true;
              this.$message({message: res.data.msg, type: 'success'});
              this.icon = 'el-icon-star-on';
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }
      },
      isCollection() {
        let uid = Cookies.get('user');
        let arid = this.article.aid;
        this.$api.get('/per/iscollection/' + uid + '/' + arid).then(res => {
          if (res.data.code === 200) {
            this.collection = true;
            this.icon = 'el-icon-star-on';
          } else {
            this.collection = false;
            this.icon = 'el-icon-star-off';
          }
        })
      }
    }
  }
</script>
