<template>
  <div class="park">
    <div class="park-btn">
      <span>查询日期：</span><el-date-picker v-model="month_select" type="month" placeholder="选择月" @change="selectMonth"></el-date-picker>
      <el-button type="danger" style="float:right;margin-right:20px;" size="medium" @click="saveScore()">保存评分</el-button>
    </div>
    <div class="park-table">
      <div v-for="department in tableData">
        <div><h3>{{department.department?department.department.name:'无部门'}}</h3></div>
        <!-- <div id="myChart" :style="{width: '100%', height: '350px'}"></div> -->
      <el-table
        :data="department.data"
        border
        style="width: 95%">
        <el-table-column label="用户信息"><template slot-scope="scope">{{scope.row.realName}},{{scope.row.phone}},{{scope.row.kind}}</template></el-table-column>
        <el-table-column label="手环数据"><template slot-scope="scope">{{scope.row.distance[0][0]}}米({{scope.row.distance[0][1]}}个点)</template></el-table-column>
        <el-table-column label="电子工牌数据"><template slot-scope="scope">{{scope.row.distance[1][0]}}米({{scope.row.distance[1][1]}}个点)</template></el-table-column>
        <el-table-column label="app数据"><template slot-scope="scope">{{scope.row.distance[2][0]}}米({{scope.row.distance[2][1]}}个点)</template></el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            评分:<span>{{scope.row.score.score}}</span><el-input size="mini" v-model="scope.row.score.score"></el-input>
            <!-- <el-button type="text" size="mini" @click="updateUserDialog(scope.row)"></el-button> -->
            <!-- <el-button type="text" size="mini" @click="deleteUserDialog(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>

  </div>
</template>

<script>
import chart_line from '../../global/chart_line.js'

export default {

  name: 'Park',
  data () {
    return {
      month_select:new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      tableData:[],
    }
  },
  created(){
    this.getDistanceList()

  },
  methods:{
    saveScore(){
      var temp = []
      this.tableData.forEach(item=>{
        item.data.forEach(item2=>{
          temp.push({from_time:item2.score.from_time,score:item2.score.score,user:item2.score.user})
        })
      })
      this.$global.httpPostWithToken(this,'user/score',{action:0,data:temp}).then(res=>{
        this.$global.success(this,'评分成功')
        this.getDistanceList()
      })
    },
    selectMonth(val){
      this.getDistanceList()
    },
    getNextMonth(date){
      return new Date(date.getFullYear(), date.getMonth()+1, 1)
    },
    getDistanceList(){
      var temp = { from_time:this.$dtime(this.month_select).format('YYYY-MM-DD HH:mm:ss'),to_time:this.$dtime(this.getNextMonth(this.month_select)).format('YYYY-MM-DD HH:mm:ss')}
      this.$global.httpGetWithToken(this,'work/distance',temp).then(res=>{

        this.showDepartmentList(res.data)
      })
    },

    showDepartmentList(data){
      var temp = []
      data.forEach(item=>{
        item.data.forEach(item2=>{
          // console.log(item2)

          if(item2.departments[0] && !item.department){
            item.department = item2.departments[0]
          }
          if(item2.scores[0]){
            item2.score = item2.scores[0]
          }else {
            item2.score = {
              score:'',
              user:item2._id,
              from_time:this.$dtime(this.month_select).format('YYYY-MM-DD HH:mm:ss')
            }
          }
          item2.distance=[[0,0],[0,0],[0,0]]
          if(item2.wrist.length > 0){
            item2.wrist.forEach(wrist=>{
              item2.distance[0][0] = item2.distance[0][0]+wrist.distance
              item2.distance[0][1] = item2.distance[0][1]+wrist.number
            })
          }
          if(item2.card.length > 0){
            item2.card.forEach(card=>{
              item2.distance[1][0] = item2.distance[1][0]+card.distance
              item2.distance[1][1] = item2.distance[1][1]+card.number
            })
          }
          if(item2.app.length > 0){
            item2.app.forEach(app=>{
              item2.distance[2][0] = item2.distance[2][0]+app.distance
              item2.distance[2][1] = item2.distance[2][1]+app.number
            })
          }
        })
      })
      this.tableData = data
      console.log(this.tableData)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.park{
  height: 100%;
}
.park-btn {
  margin: 10px;
}
.park-red {
  background-color: red;
  color:white;
  padding:5px;
}
.park-green{
  background-color: green;
  color: white;
  padding:5px;
}
.park-table {
  margin-left: 10px;
}
</style>
