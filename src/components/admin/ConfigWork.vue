<template>
  <div class="park">
    <div class="park-btn">
      <span>查询日期：</span><el-date-picker v-model="month_select" type="month" placeholder="选择起始月" @change="selectMonth"></el-date-picker>
      <el-date-picker v-model="month_select2" type="month" placeholder="选择结束月" @change="selectMonth"></el-date-picker>
    </el-date-picker>
    </div>
    <div class="park-table">
      <div v-for="department in tableData">
        <div><h3>{{department.department?department.department.name:'无部门'}}</h3></div>
        <!-- <div id="myChart" :style="{width: '100%', height: '350px'}"></div> -->
      <el-table
        :data="department.data"
        border
        style="width: 95%;">
        <el-table-column label="用户信息"><template slot-scope="scope">{{scope.row.realName}},{{scope.row.phone}},{{scope.row.kind}}</template></el-table-column>
        <el-table-column :label="item" v-for="item in monthList"><template slot-scope="scope">{{scope.row[item]}}</template></el-table-column>
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
      month_select:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
      month_select2:new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      tableData:[],
      monthList:{}
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
          temp.push(item2.score)
        })
      })
      this.$global.httpPostWithToken(this,'user/score',{action:0,data:temp}).then(res=>{
        this.getDistanceList()
      })
    },
    selectMonth(val){
      if(this.month_select.getTime()<=this.month_select2.getTime()){
        this.getDistanceList()
      }
    },
    getNextMonth(date){
      return new Date(date.getFullYear(), date.getMonth()+1, 1)
    },
    getDistanceList(){
      var temp = { from_time:this.$dtime(this.month_select).format('YYYY-MM-DD HH:mm:ss'),to_time:this.$dtime(this.getNextMonth(this.month_select2)).format('YYYY-MM-DD HH:mm:ss')}
      this.$global.httpGetWithToken(this,'work/score',temp).then(res=>{
        console.log(res.data)
        this.showDepartmentList(res.data)
      })
    },

    showDepartmentList(data){
      this.monthList = {}
      var tempPP = {}
      this.tableData = []
      data.forEach(item=>{
        item.data.forEach(item2=>{
          if(item2.departments[0] && !item.department){
            item.department = item2.departments[0]
          }
          if(item2.scores){
            var temp = this.month_select
            while(temp.getTime() <= this.month_select2.getTime()){
              var tempDate =  this.$dtime(temp).format('YYYY-MM')
              tempPP[tempDate] = tempDate
              item2.scores.forEach(score=>{
                if(this.$dtime(score.from_time).format('YYYY-MM') == tempDate){
                  // console.log(score)
                  item2[tempDate] = score.score
                }
              })
              if(!item2[tempDate]){
                item2[tempDate] = '暂无评分'
              }
              temp = this.getNextMonth(temp)
              // console.log(temp)
            }
          }
        })
      })

      this.tableData = data
      this.$nextTick(()=>{
        this.monthList = tempPP
      })
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
