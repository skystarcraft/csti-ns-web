<template>
  <div id="register">

    <div class="me-login-box me-login-box-radius">
      <h1>CSTI-NS 注册</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="uid">
          <el-input placeholder="学号" v-model="userForm.uid"></el-input>
        </el-form-item>

        <el-form-item prop="user_name">
          <el-input placeholder="姓名" v-model="userForm.user_name"></el-input>
        </el-form-item>

        <el-form-item prop="user_password">
          <el-input placeholder="密码" type="password" v-model="userForm.user_password"></el-input>
        </el-form-item>

        <el-form-item prop="user_birth">
          <el-date-picker style="width: 100%"
            v-model="userForm.user_birth"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="生日">
          </el-date-picker>
        </el-form-item>

        <el-form-item prop="user_address">
          <el-input placeholder="入学前住址，如黑龙江" v-model="userForm.user_address"></el-input>
        </el-form-item>

        <el-form-item prop="user_class">
          <el-input placeholder="班级，如计科2班" v-model="userForm.user_class"></el-input>
        </el-form-item>

        <el-form-item prop="ugrate">
          <el-input placeholder="年级，如2015" v-model="userForm.ugrate"></el-input>
        </el-form-item>

        <el-form-item prop="user_phone">
          <el-input placeholder="手机" v-model="userForm.user_phone" style="width: 60%"></el-input>
          <el-button type="primary" @click.native="sendCode(userForm)" style="width: 40%">接收验证码</el-button>
        </el-form-item>

        <el-form-item prop="user_phone">
          <el-input placeholder="验证码" v-model="userForm.v_code"></el-input>
        </el-form-item>

        <el-form-item prop="user_mail">
          <el-input placeholder="邮箱" v-model="userForm.user_mail"></el-input>
        </el-form-item>

        <el-form-item prop="usex">
          <el-radio-group v-model="userForm.usex.val">
            <el-radio v-for="item in userForm.usex" :key="item.label" :label="item.describe" v-model="item.val"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native="register(userForm)">注册</el-button>
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
    name: 'Register',
    data() {
      return {
        userForm: {
          uid: '',
          user_name: '',
          user_password: '',
          usex: [{label: 2, val: 1, describe: "男"},{label: 1, val: 0, describe: "女"}],
          user_birth: '',
          user_address: '',
          user_class: '',
          ugrate: '',
          user_phone: '',
          v_code: '',
          user_mail: '',
          currentCode: '',
        },
        rules: {
          uid: [
            {required: true, message: '请输入学号，如20152199', trigger: 'blur'},
            {max: 8, message: '不能大于8个字符', trigger: 'blur'},
            {min: 8, message: '不能小于8个字符', trigger: 'blur'}
          ],
          user_password: [
            {required: true, message: '请输入密码，如111111', trigger: 'blur'},
            {max: 20, message: '不能大于20个字符', trigger: 'blur'},
            {min: 6, message: '不能小于6个字符', trigger: 'blur'}
          ],
          user_name: [
            {required: true, message: '请输入姓名，如欧尼酱', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'},
            {min: 2, message: '不能小于2个字符', trigger: 'blur'}
          ],
          usex: [
            {required: true, message: '请输入性别', trigger: 'blur'}
          ],
          user_birth: [
            {required: true, message: '请输入生日', trigger: 'blur'}
          ],
          user_address: [
            {required: true, message: '请输入入学前住址，如黑龙江', trigger: 'blur'},
            {max: 50, message: '不能大于50个字符', trigger: 'blur'}
          ],
          user_class: [
            {required: true, message: '请输入班级，如计科2班', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          ugrate: [
            {required: true, message: '请输入年级，如2015', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          user_phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {max: 11, message: '不能大于11个字符', trigger: 'blur'},
            {min: 11, message: '不能小于11个字符', trigger: 'blur'}
          ],
          user_mail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {max: 20, message: '不能大于20个字符', trigger: 'blur'},
            {min: 6, message: '不能小于6个字符', trigger: 'blur'}
          ],
          usex: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      register(userForm) {
        if (userForm.v_code === userForm.currentCode) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(userForm.user_mail) && userForm.uid.length === 8 && userForm.user_name.length >=2 && userForm.user_password.length >= 6 && userForm.user_phone.length === 11
                && userForm.user_address.length >= 2 && userForm.user_class.length >= 4 && userForm.ugrate.length >= 2) {
            var sex = userForm.usex.val === "男" ? 1 : 0;
            this.$api.post('/sso/user/register',{
              uid: userForm.uid,
              user_name: userForm.user_name,
              user_password: userForm.user_password,
              usex: sex,
              user_birth: userForm.user_birth,
              user_address: userForm.user_address,
              user_class: userForm.user_class,
              ugrate: userForm.ugrate,
              user_phone: userForm.user_phone,
              user_mail: userForm.user_mail
            }).then(res => {
              if (res.data.code === 200) {
                // this.$Global.cookie.set("token", res.data.data);
                console.log(res.data.data);
                this.$message({message:"注册成功！", type: 'success'});
                this.$router.push({name: 'login'});
              } else {
                this.$message.error(res.data.msg);
              }
            })
          } else {
            this.$message.error("信息填写有误！");
          }
        } else {
          this.$message.error("验证码错误！");
        }
      },
      sendCode(userForm) {
        this.$api.get('/sso/user/vcode/' + userForm.user_phone).then(res => {
          if (res.data.code === 200) {

            userForm.currentCode = res.data.data;
            // console.log(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
    }
  }
</script>

<style scoped>
  #register {
    min-width: 100%;
    min-height: 100%;
  }

  .me-video-player {
    background-color: transparent;
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
    position: absolute;
    left: 0;
    z-index: 0;
    top: 0;
  }

  .me-login-box {
    position: absolute;
    width: 300px;
    height: 260px;
    background-color: white;
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
    color: #5FB878 !important;
  }

  .me-login-button {
    text-align: center;
  }

  .me-login-button button {
    width: 100%;
  }

</style>
