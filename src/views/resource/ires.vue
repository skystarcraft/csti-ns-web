<template>
  <div style="padding: 0 100px" v-model="resource">
    <div id="res">
      <el-table
      :data="resources"
      border
      style="width: 100%">
      <el-table-column
        prop="rname"
        label="名称"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="rscore"
        label="所需积分"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="rdownload"
        align="center"
        label="下载量"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        label="资源评分"
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.rstar}} / 5</span> 
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click.native="delResource(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'IRes',
    data() {
      return {
        resources: [],
        comments: null,
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
      this.getResource();
      this.getUser();
    },
    methods: {
      getResource() {
        var uid = Cookies.get('user');
        this.$api.get('/res/my/res/' + uid).then(res => {
          if (res.data.code === 200) {
            this.resources = res.data.data;
          } else {
            this.$message.error(res.data.msg);
            article = null;
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
            this.$message.error(res.data.msg);
            this.$router.push({name: 'login'});
          }
        })
      },
      delResource(resource) {
        var uid = Cookies.get('user');
        this.$api.get('/res/res/del/' + resource.rid).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.getResource();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
    }
  }
</script>
