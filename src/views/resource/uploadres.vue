<template>
  <div>
  <el-upload
    class="upload-demo"
    drag
    action=""
    :before-upload="beforeAvatarUpload"
    multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传rar/zip文件，且不超过10M</div>
  </el-upload>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'UploadRes',
    data() {
      return {
        dialogVisible: '',
        resource: {
          rid: '',
          rname: '',
          rscore: '',
          rdownload: '',
          ruid: '',
          raddr: '',
        },
      }
    },
    mounted() {
      this.getUser();
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
      beforeAvatarUpload (file) {
        var fileName=new Array()
        fileName =file.name.split('.');
        const extension = fileName[fileName.length-1] === 'rar'
        const extension2 =  fileName[fileName.length-1]=== 'zip'
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!extension && !extension2) {
            this.$message({
                message: '上传模板只能是rar、zip格式!',
                type: 'warning'
            });
        }
        if (!isLt2M) {
            this.$message({
                message: '上传模板大小不能超过 10MB!',
                type: 'warning'
            });
        }
        if (extension || extension2 && isLt2M == true) {
            let fd = new FormData()
            fd.append('uid', Cookies.get('user'))
            fd.append('file', file)
            this.newImport(fd);
            return true
        }
        return extension || extension2 && isLt2M
      },
      newImport (data) {
        this.$api.post('/res/uploadToFast', data).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg)
            }
        });
      },
    }
  }
</script>
