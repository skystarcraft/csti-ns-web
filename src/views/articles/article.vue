<template>
  <div id="article">
    <div  v-model="article">
      <div style="display:flex;align-items: center;">
        <h1>{{article.article_title}}</h1>
        <el-button style="margin-left: auto;height: 40px" type="primary" :icon='icon' @click="collectionArticles()" v-model='icon'></el-button>
      </div>
      <div class="info">
        <div>作者：{{article.uid}}</div>
        <div style="margin-left:auto">
          <span>发布时间：{{article.adate}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span> 阅读量：{{article.article_view}}</span>
        </div>
      </div>
      <hr>
      <div class="content">{{article.article_context}}</div>
    </div>
    <hr>
    <br>
    <div>
      <h3>评论</h3>
      <br>
      <div v-if="comments">
        <div style="display:flex;align-items: center;margin:20px 0" :key="comment.cdate" v-for="comment in comments">
          <div style="margin-right:14px;">{{comment.uid}}:</div>
          <div style="font-weight:600;">{{comment.article_context}}</div>
          <div style="margin-left:auto;font-size:12px">{{comment.cdate}}</div>
        </div>
      </div>
      <div style="text-align: center;margin: 20px 0" v-else>
        暂无评论哦
      </div>
      <div style="margin-top: 50px">
          <el-input type="textarea" rows="6" placeholder="说点什么吧~" v-model="comment.article_context"></el-input>
          <el-button style="float:right;margin-top:10px" type="primary" @click.native="writeComment(comment)">发布评论</el-button>
      </div>
    </div>
    


    

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
            this.$message.success(res.data.msg);
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

<style>
  #article {
    text-align: left;
    padding-left: 60px;
  }
  .info {
    display:flex;
    /* width: 70%; */
    color: rgb(172, 172, 172);
    font-size: 15px;
    margin-bottom: 20px;
  }
  .content{
    margin: 30px 0;
    min-height: 400px;
    clear: both;
    /* border: 1px solid #000 */
  }
</style>

