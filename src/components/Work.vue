<template>
  <div class="main">
    <div class="left-content">
      <div class="block">
        <div class="title"><h4>垃圾车</h4></div>
        <div class="tem-table">
          <el-table
            border
            size="mini"
            :data="carData"
            @current-change="selectTableData"
            style="width: 100%">
            <el-table-column prop="carName" label="姓名"><template slot-scope="scope">{{scope.row.user?scope.row.user.realName:'未知'}}</template></el-table-column>
            <el-table-column prop="phone" label="手机" width="100"><template slot-scope="scope">{{scope.row.user?scope.row.user.phone:'未知'}}</template></el-table-column>
            <el-table-column prop="name" label="车牌"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="block">
        <div class="title"><h4>环卫工</h4></div>
        <div class="tem-table">
          <el-table
            border
            size="mini"
            :data="userData"
            @current-change="selectTableData"
            style="width: 100%">
            <el-table-column
              prop="realName"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机" width="100">
            </el-table-column>
            <el-table-column
              prop="kind"
              label="分工">
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>
    <div class="amap-wrapper" v-loading="loading" element-loading-text="读取路径数据中">
      <div class="clean-btn">
        <el-radio v-model="checkSelect" :label="index" v-for="(item,index) in checkBox" @change="clickCheckBox">{{item}}</el-radio>

        <el-button @click="cleanPoly" size="small" >清空路径</el-button>
      </div>

      <el-amap vid="amapDemo" :zoom="map.zoom" :center="map.position">
          <template v-for="items in markers">
          <el-amap-marker v-for="item in items" :position="item.position" :events="item.events" :visible="item.visible"
                 :offset="item.offset" :content="item.content" :zIndex="item.zIndex"></el-amap-marker>
          </template>
        <el-amap-polyline  :path="polyline.path" :visible="polyline.visible"></el-amap-polyline>
      </el-amap>
    </div>
    <div class="right-content">
      <div class="block2">
      <div class="title"><h4>垃圾桶</h4></div>
      <div class="tem-table2">
        <el-table
          border
          size="mini"
          :data="canData"
          @current-change="selectTableData"
          style="width: 100%">
          <el-table-column label="地区"><template slot-scope="scope">{{scope.row.can[0]?scope.row.can[0].name:'未知'}}度</template></el-table-column>
          <el-table-column label="状态"><template slot-scope="scope">{{scope.row.isFull?'满':'未满'}}</template></el-table-column>
          <el-table-column prop="temperature" label="温度"></el-table-column>
        </el-table>
      </div>
      </div>
    </div>
    <el-dialog
      title="选择起始日期"
      :visible.sync="isSelectOpen"
      width="60%">
        <el-date-picker
          v-model="datePicker"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isSelectOpen = false">取 消</el-button>
        <el-button type="primary" @click="selectDate">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
// import html2canvas from 'html2canvas';
import { AMapManager } from 'vue-amap';


export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mode:0,
      checkBox:['全部','人员','车辆','垃圾桶'],
      checkSelect:'全部',
      isSelectOpen:false,
      loading:false,
      datePicker:[new Date(parseInt(this.$dtime(this.$dtime(new Date()).format('YYYY-MM-DD')+' 06:00:00').format('x'))),new Date()],
      userData:[],
      canData:[],
      carData:[],
      selectData:null,
      polyline:{
        visible:false,
        path:[]
      },
      map:{
        zoom:11,
        position:[121.5273285, 31.21715058]
      },
      markers:[],
      state:{
        tInterval:null,
        sInterval:null,
        num:0
      },

      number:0,

    }
  },
  created(){
    this.init()
  },
  mounted(){

  },
  beforeDestory(){
    if(this.state.tInterval){
      clearInterval(this.state.tInterval)
    }
    if(this.state.sInterval){
      clearInterval(this.state.sInterval)
    }
  },
  methods:{
    clickCheckBox(val){
      this.markers.forEach(item=>{
        if(val == 0 || item[0].data.kind+1 == val){
          item[0].visible = true
          item[1].visible =false
        }else {
          item[0].visible = false
          item[1].visible = false
        }
      })
    },
    async init(){
      await this.getCan()
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
      },20000)
      this.state.sInterval = setInterval(()=>{
        this.nextStep()
      },1000)
    },
    async getCan(){
      const res = await this.$global.httpGetWithToken(this,'can/allOfConfig')
      this.canData = res.data
      this.canData.forEach(item=>{
        this.addCanMarker(item)
      })
    },
    async getCar(){
      const res = await this.$global.httpGetWithToken(this,'car/all')
      this.carData = res.data
    },
    async getUser(){
      const res = await this.$global.httpGetWithToken(this,'user/allData')
      this.userData = res.data
      res.data.forEach(item=>{
        this.addUserMarker(item)
      })
    },
    async getCarData(){
      this.$global.httpGetWithToken(this,'car/data').then(res=>{
        res.data.forEach(item=>{
          this.addCarMarker(item)
        })
        console.log(this.markers)
      })
    },
    cleanPoly(){
      this.polyline.path = []
      this.polyline.visible = false
    },
    selectTableData(val){
      this.map.zoom = 13
      var temp = false
      this.markers.forEach(item=>{
        if(item[0].data.sn == val.sn){
          temp = true
          this.map.position = item[0].position
          item[1].visible = true
        }else {
          item[1].visible = false
        }
      })
      if(temp == false){
        this.$global.error(this,'暂无坐标信息')
      }
    },
    nextStep(){
      this.markers.forEach(item=>{
        if(item[0].data.kind == 1){
          if(item[0].data.times < 10){
            var temp = [item[0].position[0]+(item[0].data.target[0]-item[0].position[0])/(10-item[0].data.times),item[0].position[1]+(item[0].data.target[1]-item[0].position[1])/(10-item[0].data.times)]
            item[0].position = temp
            item[1].position = temp
          }else {
            item[0].position =[item[0].data.target[0],item[0].data.target[1]]
            item[1].position =[item[0].data.target[0],item[0].data.target[1]]
          }
          item[0].data.times++;
        }
      })
    },
    showReplay(item){
      this.selectData = item[0].data
      this.isSelectOpen = !this.isSelectOpen
    },
    selectDate(){
      // console.log(this.datePicker,this.$dtime(this.datePicker[0]).format('YYYY-MM-DD HH:mm:ss'),this.$dtime(this.datePicker[1]).format('YYYY-MM-DD HH:mm:ss'))
      this.isSelectOpen = !this.isSelectOpen
      this.loading = true
      if(this.selectData.kind == 0){

      }else {
        var temp = {from_time:this.$dtime(this.datePicker[0]).format('YYYY-MM-DD HH:mm:ss'),to_time:this.$dtime(this.datePicker[1]).format('YYYY-MM-DD HH:mm:ss')}
        temp.sn = this.selectData.sn
        this.$global.httpGetWithToken(this,'car/historyData',temp).then(res=>{
          this.loading = false
            var tempRes = []
            var tempQ = []
            res.data.forEach(item=>{
              var tempCoord = this.$transform.wgs84togcj02(item.lng,item.lat)
              item.lng = tempCoord[0]
              item.lat = tempCoord[1]
              if(tempQ.length == 0) {
                tempQ = [item.lng,item.lat]
              }else if(tempQ[0] != item.lng || tempQ[1] != item.lat){
                tempRes.push([item.lng,item.lat])
              }
            })
            this.polyline.path = tempRes
            this.polyline.visible = true
        }).catch(res=>{
          this.loading = false
        })
      }

    },
    addUserMarker(data){
      var temp
      if(data.wrist[0]){
        data.sn = data.sn_wrist
        temp = data.wrist[0]
      }else if(data.card[0]){
        data.sn = data.sn_card
        temp = data.card[0]
      }
      if(temp && temp.lng){
        var tempCoord = this.$transform.wgs84togcj02(temp.lng,temp.lat)
        data.lng = tempCoord[0]
        data.lat = tempCoord[1]
        var hasPeople = false
        this.markers.forEach(item=>{
          if(item[0].data.sn == data.sn){
            hasPeople = true
            item[0].position = [data.lng,data.lat],
            item[1].position = [data.lng,data.lat]
          }
        })
        if(hasPeople == false){
          var marker = this.setBasicMarker(data,0)
          var tempImg = require('../assets/work/person.png')
          marker[0].content = '<div style="width:40px;text-align:center;"><img src="'+tempImg+'" style="width:25px"><div style="font-size:12px;background-color:white;margin-top:-10px;border-radius:4px;border:1px solid #999999">'+data.realName+'</div></div>'
          marker[1].content = '<div style="width:200px;height:180px;text-align:left;background-color:white;border-radius:4px;border:1px solid #666666;padding:4px">'
          +'<el-button size="mini" style="background-color:#cccccc;padding:3px;color:#333333 !important;">回放</el-button><span style="padding-left:5px">编号:'+data.sn+'</span>'
          +'<div style="width=100%;height:1px;background-color:#999999;margin-top:3px"></div>'
          +'<table style="width:100%"><tr><td>姓名</td><td>'+data.realName+'</td></tr><tr><td>职务</td><td>'+data.title+'</td></tr><tr><td>工种</td><td>'+data.kind+'</td></tr><tr><td>乡镇</td><td>'+data.place+'</td></tr><tr><td>手机</td><td>'+data.phone+'</td></tr></table></div>'
          this.markers.push(marker)
        }
      }
    },
    addCanMarker(data){
          //垃圾桶
          var tempCoord = this.$transform.wgs84togcj02(data.lng,data.lat)
          data.lng = tempCoord[0]
          data.lat = tempCoord[1]
          if(data.can[0]){
            data.lng = data.can[0].lng
            data.lat = data.can[0].lat
            if(Object.keys(this.markers) == 0){
              this.map.position = [data.lng,data.lat]
            }
            var marker = this.setBasicMarker(data,2)
            marker[0].content = '<div style="width:25px;text-align:center;"><img src="'+require('../assets/work/bin.png')+'" style="width:100%"></div>'
            marker[1].content = '<div style="width:200px;height:140px;text-align:left;background-color:white;border-radius:4px;border:1px solid #666666;padding:4px">'
            +'<table style="width:100%"><tr><td>编号</td><td>'+data.sn+'</td></tr><tr><td>名称</td><td>'+(data.can[0]?data.can[0].name:'未知')+'</td></tr><tr><td>乡镇</td><td>'+(data.can[0]?data.can[0].place:'未知')+'</td></tr><tr><td>温度</td><td>'+data.temperature+'度</td></tr><tr><td>容量</td><td>'+(data.isFull?'满':'未满')+'</td></tr></table></div>'
            this.markers.push(marker)
            // console.log(this.markers[data.sn])
          }
    },
    addCarMarker(data){
      var tempCoord = this.$transform.wgs84togcj02(data.lng,data.lat)
      data.lng = tempCoord[0]
      data.lat = tempCoord[1]
      var temp = false
      this.markers.forEach(item=>{
        if(item[0].data.sn == data.sn){
          temp = true
          item[0].data.target = [data.lng,data.lat],
          item[0].data.times = 0
          var tempImg = data.lng > item[0].position[0] ? require('../assets/work/'+this.$global.ENUM.CAR_PIC[item[0].data.type][0]):require('../assets/work/'+this.$global.ENUM.CAR_PIC[item[0].data.type][1])
          item[0].content = '<div style="width:60px;text-align:center"><img src="'+tempImg+'" style="width:25px"><div style="font-size:12px;background-color:white;margin-top:-10px;border-radius:4px;border:1px solid #999999">'+item[0].data.name+'</div></div>'
          if(this.$global.getFlatternDistance(item[0].position[0],item[0].position[1],data.lng,data.lat)>2000){
            item[0].position = [data.lng,data.lat],
            item[1].position = [data.lng,data.lat]
          }

        }
      })
      if(temp == false){
        this.carData.forEach(item=>{
          if(item.sn == data.sn){
            var marker = this.setBasicMarker(data,1)
            // console.log(marker[0],this.$global.ENUM.CAR_PIC[item.type][0],item.type)
            marker[0].content = '<div style="width:60px;text-align:center"><img src="'+require('../assets/work/'+this.$global.ENUM.CAR_PIC[item.type][0])+'" style="width:25px"><div style="font-size:12px;background-color:white;margin-top:-10px;border-radius:4px;border:1px solid #999999">'+item.name+'</div></div>'
            marker[0].zIndex = 2
            marker[0].data.target = [data.lng,data.lat],
            marker[0].data.type = item.type
            marker[0].data.name = item.name
            marker[0].data.times = 0
            marker[1].content = '<div style="width:200px;height:160px;text-align:left;background-color:white;border-radius:4px;border:1px solid #666666;padding:4px">'
             +'<el-button size="mini" style="background-color:#cccccc;padding:3px;color:#333333 !important;">回放</el-button><span style="padding-left:5px">编号:'+item.sn+'</span>'
             +'<div style="width=100%;height:1px;background-color:#999999;margin-top:3px"></div>'
             +'<table style="width:100%"><tr><td>车牌号</td><td>'+item.name+'</td></tr><tr><td>类型</td><td>'+item.type+'</td></tr><tr><td>姓名</td><td>'+(item.user? item.user.realName:'未知') +'</td></tr><tr><td>乡镇</td><td>'+item.place+'</td></tr><tr><td>手机号</td><td>'+(item.user? item.user.phone:'未知')+'</td></tr></table></div>'
             this.markers.push(marker)
          }
        })
      }
    },
    setBasicMarker(data,kind){
      var marker = [{
                content: '',
                position:[data.lng,data.lat],
                offset:[0,0],
                data:{
                  // id:item.employeeId,
                  target:[data.lng,data.lat],
                  times:0,
                  sn:data.sn,
                  kind:kind
                },
                events: {
                  click: () => {
                    this.markers.forEach(item=>{
                      if(item[0].data.sn == data.sn){
                        item[1].visible = !item[1].visible
                      }else{
                        item[1].visible = false
                      }
                    })
                  }
                },
                zIndex:1,
                visible:true
            },{
                content: '',
                position:[data.lng,data.lat],
                offset:[40,-20],
                events: {
                  click: () => {
                    if(kind != 2){
                      this.showReplay(marker)
                    }
                    marker[1].visible = false
                  }
                },
                zIndex:3,
                visible:false
            }]
      return marker
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
}

.amap-wrapper {
  width: 60%;
  /* height:100vh; */
  height: 100%;
  float: left;
  /* display: inline-block; */
  position:relative;
  z-index: 1;
}
.clean-btn{
  right: 0;
  position: absolute;
  z-index:2;
  background-color: white;
  border:1px solid #eeeeee;
  padding-left: 10px;
}
.left-content {
  width:20%;
  float: left;
  padding:10px;
  height: 100%;
}
.tem-table {
  overflow-y: scroll;
  height: 80%;
}
.tem-table2 {
  overflow-y: scroll;
  height: 90%;
}
.right-content {
  width: 20%;
  display: inline-block;
  padding:10px;
  float: left;
  height: 100%;
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

</style>
