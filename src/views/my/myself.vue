<template>
  <div>
  <el-form ref="user" :model="user" :rules="rules">
    <el-form-item prop="uid">
      <el-input placeholder="学号" v-model="user.uid" v-bind:disabled="id===0"></el-input>
    </el-form-item>

    <el-form-item prop="user_name">
      <el-input placeholder="姓名" v-model="user.user_name" v-bind:disabled="id===0"></el-input>
    </el-form-item>

    <el-form-item prop="user_password">
      <el-input placeholder="密码" type="password" v-model="user.user_password" v-bind:disabled="id===0"></el-input>
    </el-form-item>

    <el-form-item prop="user_birth">
      <el-date-picker style="width: 100%" v-bind:disabled="id===0"
        v-model="user.user_birth"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="生日">
      </el-date-picker>
    </el-form-item>

    <el-form-item prop="user_address">
      <el-input placeholder="入学前住址，如黑龙江" v-model="user.user_address" v-bind:disabled="id===0"></el-input>
    </el-form-item>

    <el-form-item prop="user_class">
      <el-input placeholder="班级，如计科2班" v-model="user.user_class" v-bind:disabled="id===0"></el-input>
    </el-form-item>

    <el-form-item prop="ugrate">
      <el-input placeholder="年级，如2015" v-model="user.ugrate" v-bind:disabled="id===0"></el-input>
    </el-form-item>

    <el-form-item prop="user_phone">
      <el-input placeholder="手机" v-model="user.user_phone" v-bind:disabled="id===0"></el-input>
    </el-form-item>

    <el-form-item prop="user_mail">
      <el-input placeholder="邮箱" v-model="user.user_mail" v-bind:disabled="id===0"></el-input>
    </el-form-item>

    <el-form-item prop="usex">
      <el-radio-group v-model="user.usex.val">
        <el-radio v-for="item in user.usex" :key="item.label" :label="item.describe" v-model="item.val" v-bind:disabled="id===0"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item size="small" class="me-login-button">
      <el-button type="primary" @click.native="edit()">编辑</el-button>
      <el-button type="primary" @click.native="updateUser(user)" v-bind:disabled="id===0">提交</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Myself',
    data() {
      return {
        id: 0,
        user: {
          uid: '',
          user_name: '',
          user_password: '',
          usex: [{label: 2, val: 1, describe: "男", isCheck: true}, {label: 1, val: 0, describe: "女", isCheck: false}],
          user_birth: '',
          user_address: '',
          user_class: '',
          ugrate: '',
          user_phone: '',
          v_code: '',
          user_mail: '',
          user_image: '',
          uintegral: '',
          type: '',
          user_pay: ''
        },
        rules: {
          uid: [
            {required: true, message: '请输入学号，如20152199', trigger: 'blur'},
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
          ],
          ugrate: [
            {required: true, message: '请输入年级，如2015', trigger: 'blur'},
          ],
          user_phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
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
    mounted() {
      // this.getUser();
      this.getUserFromMysql();
    },
    methods: {
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
      getUserFromMysql() {
        let uid = Cookies.get('user');
        let token = Cookies.get('token');
        if (token === null) {
          this.$message.error("请重新登录！");
          this.$router.push({name: 'login'})
        } else{
          this.$api.get('/per/user/' + uid).then(res => {
            if (res.data.code === 200) {
              this.user.uid = res.data.data.uid;
              this.user.user_name = res.data.data.user_name;
              this.user.user_password = res.data.data.user_password;
              this.user.user_birth = res.data.data.user_birth;
              this.user.user_address = res.data.data.user_address;
              this.user.user_class = res.data.data.user_class;
              this.user.ugrate = res.data.data.ugrate;
              this.user.user_phone = res.data.data.user_phone;
              this.user.user_mail = res.data.data.user_mail;
              this.user.user_image = res.data.data.user_image;
              this.user.uintegral = res.data.data.uintegral;
              this.user.type = res.data.data.type;
              this.user.user_pay = res.data.data.user_pay
            } else {
              Cookies.remove('token');
              Cookies.remove('user');
              this.$message.error("请重新登录！");
              this.$router.push({name: 'login'})
            }
          })
        }
      },
      edit() {
        this.id = 1;
      },
      updateUser(userForm) {
        if (userForm.usex.val != null) {
          var sex = userForm.usex.val === "男" ? 1 : 0;
          this.$api.put('/per/user',{
            uid: userForm.uid,
            user_name: userForm.user_name,
            user_password: userForm.user_password,
            usex: sex,
            user_birth: userForm.user_birth,
            user_address: userForm.user_address,
            user_class: userForm.user_class,
            ugrate: userForm.ugrate,
            user_phone: userForm.user_phone,
            user_mail: userForm.user_mail,
            user_image: userForm.user_image,
            uintegral: userForm.uintegral,
            type: userForm.type,
            user_pay: userForm.user_pay
          }).then(res => {
            if (res.data.code === 200) {
              // this.$Global.cookie.set("token", res.data.data);
              this.$message({message:"修改成功！", type: 'success'});
            } else {
              this.$message.error(res.data.msg);
            }
          })
        } else {
          this.$message.error("没有选中性别！");
        }
      }
    }
  }
</script>

<style scoped>
</style>
