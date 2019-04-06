<template>
  <div>
    <div id="resource" v-model="resource">
      <el-form ref="resource" :model="resource">
        <el-form-item>
          <li>{{resource.rid}}</li>
          <li>{{resource.rname}}</li>
          <li>{{resource.rscore}}</li>
          <li>{{resource.rdownload}}</li>
          <li>{{resource.ruid}}</li>
        </el-form-item>
        <el-form-item size="large" class="me-login-button">
          <el-button type="primary" @click.native="download(resource)">下载</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="comments">
      <li v-for="comment in comments">{{comment}}</li>
    </div>

    <el-form ref="comment" :model="comment">
        <el-form-item>
          <el-input placeholder="发布评论" v-model="comment.comment_context"></el-input>
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
        }
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
        var rid = this.$route.params.rid;
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
        var rid = this.$route.params.rid;
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
            this.$message(res.data.msg);
            this.getComments();
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
