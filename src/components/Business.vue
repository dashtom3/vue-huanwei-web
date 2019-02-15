<template>
  <div class="main">

    <div style="margin-bottom:10px;margin-left:10px;backgroundColor:white;width:240px;padding:5px;text-align:center;border-radius:5px;font-weight:bold"><span>今日实时运营数据</span>&nbsp;&nbsp;<span style="font-weight:normal;color:#999999">{{$dtime(new Date()).format('YYYY-MM-DD')}}</span></div>
    <div class="top-data">
      <div class="left-content">
      <div class="left-top">
        <div class="left-block" v-for="item in topData">
          <div><span >{{item[0]}}:&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-weight:bold">{{item[1]}}{{item[2]}}</span></div>
        </div>
      </div>
      <div class="left-top2">
        <div class="left-block" v-for="item in topData2">
          <div><span >{{item[0]}}:&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-weight:bold">{{item[1]}}{{item[2]}}</span></div>
        </div>
      </div>
      </div>
      <div class="center-content">
        <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
      </div>
      <div class="right-content">
        <div id="myChart3" :style="{width: '100%', height: '100%'}"></div>
      </div>
    </div>
    <div class="bottom-data">
      <div class="bottom-left">
        <div id="myChart2" :style="{width: '100%', height: '100%'}"></div>
      </div>
      <div class="bottom-left">
        <div id="myChart4" :style="{width: '100%', height: '100%'}"></div>
      </div>
    </div>

  </div>

</template>

<script>
// import html2canvas from 'html2canvas';
import { AMapManager } from 'vue-amap';
import chart_pie from '../global/chart_pie.js'
import chart_line from '../global/chart_line.js'
export default {
  name: 'Main',
  data () {
    return {
      datePicker:[new Date(parseInt(this.$dtime(this.$dtime(new Date()).format('YYYY-MM-DD')+' 06:00:00').format('x'))),new Date()],
      userData:[],
      carData:[],
      topData:[['今日在线车辆',0,'辆'],['今日行驶距离',0,'公里']],
      topData2:[['今日在线人数',0,'人'],['今日步行距离',0,'公里']],
      state:{
        tInterval:null,
        num:0
      },
    }
  },
  created(){

  },
  mounted(){
    this.init()
  },
  beforeDestory(){
    if(this.state.tInterval){
      clearInterval(this.state.tInterval)
    }
  },
  methods:{

    async init(){
      // await this.getCan()
      await this.getCar()
      await this.getUser()
      this.getCarData()
      // await this.getPosition()
      this.state.tInterval = setInterval(()=>{
        this.getCarData()
        this.state.num++
        if(this.state.num >3){
          this.state.num = 0
          this.getUser()
        }

      },300000)
    },
    async getCar(){
      const res = await this.$global.httpGetWithToken(this,'car/all')
      this.carData = res.data
    },
    async getUser(){
      const res = await this.$global.httpGetWithToken(this,'user/allData')
      this.userData = res.data
      var tempData = [
        {name:'在线手环用户',value:0},{name:'离线手环用户',value:0},
        {name:'在线工牌用户',value:0},{name:'离线工牌用户',value:0},
        {name:'在线App用户',value:0},{name:'离线App用户',value:0},
        {name:'无设备用户',value:0}
      ]
      var tempData2 = []
      res.data.forEach(item=>{
        var tempTrue = false
        tempData2.forEach(item2=>{
          if(item2.name == (item.kind?item.kind:'未设置')){
            item2.value++
            tempTrue =true
          }
        })
        if(tempTrue == false){
          tempData2.push({name:item.kind?item.kind:'未设置',value:0})
        }
        if(item.kind != '驾驶员'){
          var temp
          var number = 0
          if(item.wrist[0]){
            temp = item.wrist[0]
          }else if(item.card[0]){
            temp = item.card[0]
            number = 2
          }else if(item.app[0]){
            temp = item.app[0]
            number = 4
          }
          if(temp){
            var timeRes = parseFloat(this.getTimeData(temp.data_time))/3600>1?true:false
            if(timeRes == true){
              tempData[number].value++
              this.topData2[0][1]++
            }else {
              tempData[number+1].value++
            }
          }else {
            tempData[6].value++
          }
        }
      })
      this.getWristData()
      this.drawPie('myChart',{title:'总环卫人数',data:tempData})
      this.drawPie('myChart3',{title:'总职工人数',data:tempData2})
    },
    drawPie(name,data){
        // 绘制图表
      chart_pie.setView(this.$echarts.init(document.getElementById(name)),data)
    },
    drawLine(data){
      var temp = {data:[],title:'车辆行驶数据'}
      var dateNow = new Date()
      this.topData[0][1] = Object.keys(data).length
      this.$set(this.topData[0],1,Object.keys(data).length)
      this.topData[1][1] = 0
      this.carData.forEach(item=>{
          if(data[item.sn]){
            var from_time = this.$dtime(new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDate(),0,0,0)).format('YYYY-MM-DD HH:mm:ss')
            var to_time = this.$dtime(new Date()).format('YYYY-MM-DD HH:mm:ss')
            var tempArray = []
            var tempxAxis = []
            while(from_time <= to_time){
              var next_day = this.$dtime(parseInt(this.$dtime(from_time).format('x'))+60*60*1000).format('YYYY-MM-DD HH:mm:ss')
              if(!temp.xAxis){
                tempxAxis.push(this.$dtime(from_time).format('HH:mm'))
              }
              if(data[item.sn][from_time]){
                var tempQ = data[item.sn][from_time].toFixed(2)
                tempArray.push(tempQ)
                this.topData[1][1] = (parseFloat(this.topData[1][1]) + parseFloat(tempQ)/1000).toFixed(2)
              }else{
                tempArray.push(0)
              }
              from_time = next_day
            }
            if(!temp.xAxis){
              temp.xAxis = tempxAxis
            }
            temp.data.push({name:item.name,data:tempArray})
          }
      })
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      chart_line.setView(myChart2,temp)
    },
    drawWristLine(data){
      var temp = {data:[],title:'手环步行数据'}
      var dateNow = new Date()
      // this.$set(this.topData[0],1,Object.keys(data).length)
      this.topData2[1][1] = 0
      this.userData.forEach(item=>{
          if(data[item.sn_wrist]){
            var from_time = this.$dtime(new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDate(),0,0,0)).format('YYYY-MM-DD HH:mm:ss')
            var to_time = this.$dtime(new Date()).format('YYYY-MM-DD HH:mm:ss')
            var tempArray = []
            var tempxAxis = []
            while(from_time <= to_time){
              var next_day = this.$dtime(parseInt(this.$dtime(from_time).format('x'))+60*60*1000).format('YYYY-MM-DD HH:mm:ss')
              if(!temp.xAxis){
                tempxAxis.push(this.$dtime(from_time).format('HH:mm'))
              }
              if(data[item.sn_wrist][from_time]){
                var tempQ = data[item.sn_wrist][from_time].toFixed(2)
                tempArray.push(tempQ)
                this.topData2[1][1] = (parseFloat(this.topData2[1][1]) + parseFloat(tempQ)/1000).toFixed(2)
              }else{
                tempArray.push(0)
              }
              from_time = next_day
            }
            if(!temp.xAxis){
              temp.xAxis = tempxAxis
            }
            temp.data.push({name:item.place?item.realName+','+item.place:item.realName,data:tempArray})
          }
      })
      console.log(temp)
      let myChart4 = this.$echarts.init(document.getElementById('myChart4'))
      chart_line.setView(myChart4,temp)
    },
    async getCarData(){
      var dateNow = new Date()
      var from_time = new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDate(),0,0,0)
      this.$global.httpGetWithToken(this,'work/carHour',{from_time:this.$dtime(from_time).format('YYYY-MM-DD HH:mm:ss'),to_time:this.$dtime(dateNow).format('YYYY-MM-DD HH:mm:ss')}).then(res=>{
        this.drawLine(res.data)
      })
    },
    async getWristData(){
      var dateNow = new Date()
      var from_time = new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDate(),0,0,0)
      this.$global.httpGetWithToken(this,'work/wristHour',{from_time:this.$dtime(from_time).format('YYYY-MM-DD HH:mm:ss'),to_time:this.$dtime(dateNow).format('YYYY-MM-DD HH:mm:ss')}).then(res=>{
        console.log(res.data)
        this.drawWristLine(res.data)
        // this.drawPie('myChart',{title:'总人数',data:tempData})
      })
    },
    setCarData(data){
      this.carData.forEach(item=>{
        data.forEach(item2=>{
          if(item.sn == item2.sn){
            item.timeRes = parseFloat(this.getTimeData(item2.data_time))/3600>1?true:false
            this.$set(item,'data_time',item2.data_time)
          }
        })
      })
      console.log(this.carData)
    },



    getTimeData(dataTime){
      return (new Date().getTime()-parseInt(this.$dtime(dataTime).format('x')))/1000
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* table,table tr th, table tr td { border:1px solid #0094ff; } */
.main{
  height: 100%;
  width: 100%;
  background-color: #eeeeee;
  padding: 10px 20px;
}
.top-data {
  height: 40%;
  width: 100%;
}
.left-top {
    width: 100%;
    /* margin:20px; */
    background-color: #A1D560;
    padding:30px 0px 30px 20px;
    border-radius: 10px;
    /* height: 50%; */
}
.left-top2 {
  width: 100%;
  /* margin:20px; */
  margin-top: 10px;
  background-color: #1BD1EC;
  padding:30px 0px 30px 20px;
  border-radius: 10px;
  /* height: 50%; */
}
.left-block{
    color: white;
    font-size: 22px;
    margin: 10px;
}
.center-content {
  width: 35%;
  float:left;
  background-color: #031f2d;
  height: 100%;
  margin-left: 2%;
  border-radius: 10px;
  text-align: center;
  /* height:100vh; */
}
.right-content {
  width: 35%;
  float:left;
  height: 100%;
  margin-left: 2%;
  border-radius: 10px;
  text-align: center;
  background-color: #031f2d;
}
.left-content {
  width:25%;
  float:left;
  height: 100%;
  /* padding:10px; */
  /* height: 100%; */
}
.bottom-data {
  height: 50%;
}
.bottom-left {
  height: 100%;
  width:48%;
  float:left;
  margin:10px;
  background-color: white;
  border-radius: 10px;
}
.tem-table {
  overflow-y: scroll;
  height: 80%;
}
.tem-table2 {
  overflow-y: scroll;
  height: 90%;
}

.block{
  height: 50%;
  border:1px solid #cccccc;
  background-color: white;
}
.block2 {
  border:1px solid #cccccc;
  background-color: white;
  height: 100%;
}
.title {
  background-color: #eeeeee;
}
.title h4 {
  margin:0px;
  padding:10px;
}
.center-tit {
  font-size: 30px;
  font-weight: bold;
  color:#CC6666;
}
.content-success {
  background-color: rgba(103,194,58,.1);
  border-color: rgba(103,194,58,.2);
  color: #67c23a;
  border:1px solid;
  border-radius: 5px;
  padding:1px;
}
.content-danger{
  background-color: rgba(245,108,108,.1);
  border-color: rgba(245,108,108,.2);
  color: #f56c6c;
  border:1px solid;
  border-radius: 5px;
  padding:1px;
}
</style>
