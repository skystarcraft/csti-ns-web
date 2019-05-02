<template>
  <div style="text-align:left;padding: 0 100px">
    <h1>报名须知</h1>
    <hr>
    <p style="font-size:19px;margin:50px 0">计算机科学技术学院、软件学院科技创新团队成立于2001年，由计算机科学技术学院、软件学院专任教师指导，由ACM程序设计组、ARM组、NS组、UI组、WEB组、IGM组六个小组以及秘书处，宣传部，外联部和后勤部四个部门组成。

    该团队成立以来，协会组织学生参加各级专业竞赛数十次，学生参赛队伍获得了第41届ACM国际大学生程序设计竞赛亚洲区域赛银奖1项、铜奖1项，第41届ACM国际大学生程序设计竞赛亚洲区CHINA-Final比赛铜奖1项，第二届中国大学生程序设计竞赛三等奖1项，第十届中国黑龙江—俄罗斯远东地区部分高校大学生计算机程序设计竞赛二等奖1项，第十届东北地区大学生程序设计竞赛三等奖3项，第十一届黑龙江省大学生程序设计竞赛二等奖2项、三等奖6项，第十三届黑龙江省ACM/ICPC大学生程序设计竞赛获得银奖4项，铜奖5项，第十二届东北地区ACM/ICPC大学生程序设计竞赛获得金奖1项，银奖1项，铜奖3项。黑龙江省网络安全宣传周网络攻防大赛三等奖2项，2016年“创青春”全国大学生创业大赛黑龙江大学选拔赛金奖1项、铜奖2项，黑龙江大学第十四届学生学术科技成果一等奖1项、二等奖1项、三等奖1项。并且组织承办了黑龙江大学第十一届ACM大学生程序设计竞赛、“Oracle杯” 编程竞赛、第一届新生程序设计竞赛等系列校级和院级竞赛，参与人数近600人次。在学校的芙蓉学子评选当中学院科技创新团队获得黑龙江大学2016年“芙蓉学子 榜样力量”学术创新奖。这些体现了团队的创新能力和竞技水平。更是为学校及科技创新团队荣誉上添上了浓墨重彩的一笔。
</p>
    <el-button type="primary" @click.native="nx()">我要报名</el-button>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    name: 'Naxin',
    data() {
      return {

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
            this.$router.push({name: 'login'})
          }
        })
      },
      nx () {
        var uid = Cookies.get('user');
        this.$api.get('/front/naxin/' + uid).then(res => {
          if (res.data.code === 200) {
            this.$message({message: res.data.msg, type: 'success'});
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
    }
  }
</script>

<style>
</style>

