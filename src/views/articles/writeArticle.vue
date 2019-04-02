<template>
  <div id="article">
    <el-form ref="article" :model="article">
      <div id="article_title">
        <el-form-item>
          <el-input placeholder="文章标题" v-model="article.article_title"></el-input>
        </el-form-item>
      </div>
      <div id="article_context" >
        <el-form-item>
          <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="article.article_context" ></mavon-editor>
        </el-form-item>

      </div>
      <el-form-item size="large" class="me-login-button">
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
          article_title: null,
          article_context: '',
          article_view: null,
          uid: null,
          article_date: null,
        },
        value: '',
        img_file: {}
      }
    },
    mounted() {
      this.getUser()
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
            alert(res.data.msg);
            console.log(res.data.data);
          } else {
            alert(res.data.msg);
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
      $imgAdd(pos, $file){
           this.img_file[pos] = $file;
       },
       $imgDel(pos){
           delete this.img_file[pos];
       },
    }
  }
</script>
