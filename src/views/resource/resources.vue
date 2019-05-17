<template>
  <div style="text-align:left;padding: 0 100px">
    <div id="myCount">我的喵币： {{score}}</div>
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
          <el-button @click.native="getOneRes(scope.row)" type="primary">资源详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Resources',
    data() {
      return {
        resources: null,
        form: {
          search: ''
        },
        score: ''
      }
    },
    mounted() {
      this.getUser();
      this.getResList();
    },
    methods: {
      getUser() {
        var token = Cookies.get('token');
        this.$api.get('/sso/user/token/' + token).then(res => {
          if (res.data.code === 200) {
            this.uid = res.data.uid;
            this.score = res.data.data.uintegral;
            // console.log(res.data.data);
          } else {
            Cookies.remove('token');
            Cookies.remove('user');
            this.$message.error("请重新登录！");
            this.$router.push({name: 'login'})
          }
        })
      },
      getResList () {
        this.$api.get('/res/allres').then(res => {
          if (res.data.code === 200) {
            this.resources = res.data.data;
            // console.log(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      getOneRes(resource) {
        // this.$router.push({name: 'resource',params: {rid: resource.rid, fordward: true}})
        this.$router.push({path: '/resource/' + resource.rid, query: {rid: resource.rid, fordward: true}})
      },
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

