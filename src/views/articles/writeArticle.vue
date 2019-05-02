<template>
  <div style="margin: 10px 20px;padding: 0 100px">
    <el-form ref="article" :model="article">
      <div id="article_title">
        <el-form-item>
          <el-input placeholder="文章标题" v-model="article.article_title"></el-input>
        </el-form-item>
      </div>
      <div id="article_context" >
        <el-form-item>
          <mavon-editor style="height:600px" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="article.article_context" ></mavon-editor>
        </el-form-item>
      </div>
      <el-select v-model="value" placeholder="请选择文章分类">
       <el-option
         v-for="item in options"
         :key="item.value"
         :label="item.label"
         :value="item.value">
       </el-option>
     </el-select>
      <el-form-item style="margin-top: 30px" size="large" class="me-login-button">
        <el-button type="primary" @click.native="writeArticle(article)">发布文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'WriteArticle',
    data() {
      return {
        article: {
          aid: null,
          article_title: '',
          article_context: '',
          article_view: 0,
          uid: null,
          adate: null,
        },
        value: '',
        img_file: {},
        options: [],
        value: ''
      }
    },
    mounted() {
      this.getUser();
      this.getTags();
    },
    methods: {
      writeArticle(article) {
        var uid = Cookies.get('user');
        this.$api.post('/art/article/', {
          article_title: article.article_title,
          article_context: article.article_context,
          uid: uid
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({message: res.data.msg, type: 'success'});
            console.log(res.data.data);
            this.addSearch(res.data.data);
            this.addTag(res.data.data);
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
            this.$message.error(res.data.msg);
            this.$router.push({name: 'login'})
          }
        })
      },
      $imgAdd(pos, $file){
           this.img_file[pos] = $file;
       },
       $imgDel(pos){
           delete this.img_file[pos];
       },
       addSearch(article) {
         this.$api.post('/es/addes',{
           aid: article.aid,
           article_title: article.article_title,
           article_context: article.article_context,
           article_view: article.article_view,
           uid: article.uid,
           adate: article.adate
         }).then(res => {
           if (res.data.code === 200) {
             console.log(res.data.msg);
           } else {
             console.log(res.data.msg);
           }
         })
       },
       addTag(article) {
         let aid = article.aid;
         let tid = this.value
         this.$api.get('/art/art/' + aid + '/tag/' + tid).then(res => {
           console.log(res.data.msg);
         })
       },
       getTags() {
         this.$api.get('/art/tags').then(res => {
           if (res.data.code === 200) {
              this.options = res.data.data;

           } else {
             this.$message.error(res.data.msg);
           }
         })
       }
    }
  }
</script>
