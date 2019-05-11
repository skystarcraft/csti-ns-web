<template>
  <div style="padding: 0 100px" v-model="records">
    <div id="res">
      <el-table
      :data="records"
      border
      style="width: 100%">
      <el-table-column
        prop="downdate"
        label="下载日期"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="rname"
        label="资源名称"
        align="center"
        width="600">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Downrecord',
    data() {
      return {
        records: [],
        record: {
          id: '',
          uid: '',
          rid: '',
          downdate: '',
          rname: ''
        },
      }
    },
    mounted() {
      this.getUser();
      this.getRecord();
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
      getRecord() {
          var uid = Cookies.get('user');
            this.$api.get('/per/download/record/' + uid).then(res => {
            if (res.data.code === 200) {
                this.records = res.data.data;
            } else if (res.data.code === 400) {
                this.records = res.data.data;
            } else {
                this.$message.error(res.data.msg);
                records = null;
            }
        })
      },
    }
  }
</script>
