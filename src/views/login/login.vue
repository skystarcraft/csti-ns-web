<template>
  <div id="login">

    <div class="me-login-box me-login-box-radius">
      <h1>CSTI-NS 登录</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="account">
          <el-input placeholder="学号" v-model="userForm.uid"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="userForm.user_password" @keyup.enter.native="login(userForm)"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native="login(userForm)" plain style="background:#409EFF" >登录</el-button>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native="register()" plain style="background:#409EFF">注册</el-button>
        </el-form-item>
      </el-form>

      <div class="me-login-design">
        <p>Designed by
          <strong>
            <router-link to="/" class="me-login-design-color">CSTI-NS</router-link>
          </strong>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

  export default {
    name: 'Login',
    data() {
      return {
        userForm: {
          uid: '',
          user_password: ''
        },
        rules: {
          uid: [
            {required: true, message: '请输入学号', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          user_password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login(userForm) {
        this.$api.post('/sso/user/login',{
          uid: userForm.uid,
          user_password: userForm.user_password
        }).then(res => {
          if (res.data.code === 200) {
            // this.$Global.cookie.set("token", res.data.data);
            Cookies.set('token', res.data.data);
            Cookies.set('user', userForm.uid);
            // console.log('token ' + Cookies.get('token'));
            this.$message({message: "登录成功!", type: 'success'});
            this.$api.get('/sso/user/token/' + res.data.data).then(r => {
              if (res.data.code === 200) {
                this.$store.commit('setUser_image', r.data.data.user_image);
                this.$store.commit('setUser_name', r.data.data.user_name)
                localStorage.setItem('setUser_image', r.data.data.user_image)
                localStorage.setItem('setUser_name', r.data.data.user_name)
              }
            });
            this.$router.push({name: 'index'});
          } else {
            this.$message.error(res.data.data);
          }
        })
      },
      register() {
        this.$router.push({name: 'register'});
      }
    }
  }
</script>

<style scoped>
  #login {
    min-width: 100%;
    min-height: 100%;
  }
  .me-login-box {
    position: absolute;
    width: 300px;
    height: 260px;
    background-color: #F2F6FC;
    margin-top: 150px;
    margin-left: -180px;
    left: 50%;
    padding: 30px;
  }

  .me-login-box-radius {
    border-radius: 10px;
    box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
  }

  .me-login-box h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    vertical-align: middle;
  }

  .me-login-design {
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
  }

  .me-login-design-color {
    color: #409EFF !important;
  }

  .me-login-button {
    text-align: center;
  }

  .me-login-button button {
    width: 100%;
  }
  .el-button--primary.is-plain {
      color: #FFF;
      background: rgb(239, 248, 242);
      border-color: rgb(191, 227, 201);
  }
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #409EFF;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
</style>
