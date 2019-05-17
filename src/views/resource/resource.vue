<template>
  <div style="text-align:left;padding: 0 100px">
    <div id="myCount">我的喵币： {{score}}</div>
    <div id="resource" v-model="resource">
      <el-form ref="resource" :model="resource">
        <el-form-item>
          <h3>{{resource.rname}}</h3>
          <div>上传者：{{resource.ruid}}</div>
          <div>所需积分：{{resource.rscore}}</div>
          <div>下载次数：{{resource.rdownload}}</div>
        </el-form-item>
        <el-form-item size="large" class="me-login-button">
          <el-button type="primary" @click.native="download(resource)">下载</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div id="comments">
      <div v-for="comment in comments">{{comment}}</div>
    </div> -->

    <!-- <el-form ref="comment" :model="comment">
        <el-form-item>
          <el-input placeholder="发布评论" v-model="comment.comment_context"></el-input>
        </el-form-item>
      <el-form-item size="large" class="me-login-button">
        <el-button type="primary" @click.native="writeComment(comment)">发布评论</el-button>
      </el-form-item>
    </el-form> -->
    <br>
    <hr>
    <div>
      <h4>资源评论</h4>
      <div v-if="comments">
        <div style="display:flex;margin:20px 0" :key="comment.cdate" v-for="comment in comments">
          <div style="margin-right:14px;">{{comment.uid}}:</div>
          <div style="font-weight:600;width:80%">{{comment.comment_context}}</div>
          <div style="margin-left:auto;font-size:12px">{{comment.ctime.replace('T',' ').replace('\.000+0000','')}}</div>
        </div>
      </div>
      <div style="text-align: center;margin: 20px 0" v-else>
        暂无评论哦
      </div>
      <div style="margin-top: 50px">
          <el-input type="textarea" rows="6" placeholder="说点什么吧~" v-model="comment.comment_context"></el-input>
          <el-button style="float:right;margin-top:10px" type="primary" @click.native="writeComment(comment)">发布评论</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Resource',
    data() {
      return {
        show: false,
        resource: {
          rid: '',
          rname: '',
          rscore: '',
          rdownload: '',
          ruid: '',
          raddr: '',
        },
        comments: null,
        comment: {
          rid: '',
          uid: '',
          comment_context: '',
          ctime: ''
        },
        score: ''
      }
    },
    mounted() {
      this.getUser();
      this.getResource();
      this.getComments();
    },
    methods: {
      getResource() {
        var isFordward = this.$route.params.fordward;
        var rid = this.$route.query.rid;
        this.$api.get('/res/res/' + rid).then(res => {
          if (res.data.code === 200) {
            this.resource.rid = res.data.data.rid;
            this.resource.rname = res.data.data.rname;
            this.resource.rscore = res.data.data.rscore;
            this.resource.rdownload = res.data.data.rdownload;
            this.resource.ruid = res.data.data.ruid;
            // console.log(res.data.data);
          } else {
            this.$message.error(res.data.msg);
            resource = null;
          }
        })
      },
      getComments() {
        var isFordward = this.$route.params.fordward;
        var rid = this.$route.query.rid;
        this.$api.get('/res/res/comments/' + rid).then(res => {
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
            console.log(res.data.data);
            this.score = res.data.data.uintegral;
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
        this.$api.post('/res/res/comment', {
          rid: this.resource.rid,
          comment_context: comment.comment_context,
          uid: uid
        }).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.getComments();
            this.comment.comment_context = '';
            // console.log(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      download(resource) {
        let rid = resource.rid;
        let uid = Cookies.get('user');
        this.$api.get('/res/res/download/' + rid + '/user/' + uid).then(res => {
          if (res.data.code === 200) {
            resource.raddr = res.data.data;
            window.open(resource.raddr, '_blank');
          } else {
            this.$message.error(res.data.msg);
            this.$router.push({name: 'xpay'})
          }
        })
      }
    }
  }
</script>

<style>
#myCount {
    height: 50px;
    color: rgb(53, 168, 97);
    font-size: 18px;
    font-weight: 600;
  }
</style>

