<template>
  <div class="wait">
    <div class="lot-table">
      <h1>上汽、平台人工停车模拟</h1>
      <el-row>
        <el-col :span="2"><el-input v-model="data1.order" placeholder="请输入停车位" size='mini'></el-input></el-col>
        <el-col :span="3"><el-input v-model="data1.licenseNo" placeholder="请输入车牌号" size='mini'></el-input></el-col>
        <el-col :span="19">
          &nbsp;
          <el-button size="mini" type="primary" @click="sqorder(data1)">预约停车位</el-button>
          <el-button size="mini" type="primary" @click="sqcancel(data1)">取消预约</el-button>
          <el-button size="mini" type="primary" @click="sqlock(data1)">降地锁</el-button>
          <el-button size="mini" type="success" @click="sqenter(data1)">模拟地锁车进</el-button>
          <el-button size="mini" type="success" @click="sqoff(data1)">模拟地锁车离</el-button>
          <el-button size="mini" type="success" @click="pushPic(2,data1)">模拟监控车位离</el-button>
          <el-button size="mini" type="success" @click="pushPic(1,data1)">模拟监控大门离</el-button>
        </el-col>
        <br></br>
        <el-input type="textarea" v-model="data1.res"></el-input>
      </el-row>
    </div>
    <div class="lot-table">
      <h1>平台自动停车模拟</h1>
      <el-row>
        <el-col :span="2"><el-input v-model="data2.order" placeholder="请输入停车位" size='mini'></el-input></el-col>
        <el-col :span="3"><el-input v-model="data2.licenseNo" placeholder="请输入车牌号" size='mini'></el-input></el-col>
        <el-col :span="19">
          &nbsp;
          <el-button size="mini" type="primary" @click="sqorder(data2)">预约停车位</el-button>
          <el-button size="mini" type="primary" @click="sqcancel(data2)">取消预约</el-button>
          <el-button size="mini" type="primary" @click="autopark(data2)">自动泊车</el-button>
          <el-button size="mini" type="success" @click="pushPic(1,data2)">模拟监控大门进</el-button>
          <el-button size="mini" type="success" @click="pushPic(2,data2)">模拟监控车位进</el-button>
          <el-button size="mini" type="success" @click="pushState(data2)">模拟推送状态2</el-button>
          <el-button size="mini" type="success" @click="sqenter(data2)">模拟地锁车进</el-button>
          <el-button size="mini" type="primary" @click="autoout(data2)">自动取车</el-button>
          <el-button size="mini" type="success" @click="sqoff(data2)">模拟地锁车离</el-button>
          <el-button size="mini" type="success" @click="pushPic(2,data2)">模拟监控车位离</el-button>
          <el-button size="mini" type="success" @click="pushPic(1,data2)">模拟监控大门离</el-button>

        </el-col>
        <br></br>
        <el-input type="textarea" v-model="data2.res"></el-input>
      </el-row>
    </div>
    <div class="lot-table">
      <h1>其余模拟</h1>
      <!-- <el-button size="mini" type="primary" @click="lockState">模拟地锁推送心跳数据</el-button> -->
      <el-button size="mini" type="primary" @click="pushVideo">推送视频数据</el-button>
      <el-button size="mini" type="primary" @click="pushHDPic">推送禾多图片数据</el-button>
      <el-button size="mini" type="primary" @click="pushOrderData">推送订单数据</el-button>
    </div>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap';
import axios from 'axios'

export default {
  name: 'Lock',
  data () {
    return {
      data1:{
        order:'001',
        licenseNo:'沪B555H1',
        res:null,
      },
      data2:{
        order:'001',
        licenseNo:'京N1H0L0',
        res:null
      }
    }
  },
  created(){
    console.log(this.getFlatternDistance(121.17018,31.27916,121.17021325797,31.279230419994),111)
  },

  methods:{
    getRad(d){
       var PI = Math.PI;
       return d*PI/180.0;
   },
   getFlatternDistance(lat1,lng1,lat2,lng2){
       var EARTH_RADIUS = 6378137.0;
       var f = this.getRad((lat1 + lat2)/2);
       var g = this.getRad((lat1 - lat2)/2);
       var l = this.getRad((lng1 - lng2)/2);

       var sg = Math.sin(g);
       var sl = Math.sin(l);
       var sf = Math.sin(f);

       var s,c,w,r,d,h1,h2;
       var a = EARTH_RADIUS;
       var fl = 1/298.257;

       sg = sg*sg;
       sl = sl*sl;
       sf = sf*sf;

       s = sg*(1-sl) + (1-sf)*sl;
       c = (1-sg)*(1-sl) + sf*sl;

       w = Math.atan(Math.sqrt(s/c));
       r = Math.sqrt(s*c)/w;
       d = 2*w*a;
       h1 = (3*r -1)/2/c;
       h2 = (3*r +1)/2/s;

       return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
   },
    autopark(val){
      this.$global.httpGetWithToken(this,'order/all').then(res=>{
        res.data.forEach(item=>{
          if(item.lot.number == val.order && item.car.name == val.licenseNo && (item.state == 2 || item.state == 5)){
            console.log(val)
            this.$global.httpGet(this,'order/autoEnter/'+item._id,{token:'bcd7df7f060d481b23ae27c53df3afe6'}).then(res=>{
              console.log(res)
              val.res = JSON.stringify(res)
            })
          }
        })
      })
    },
    pushState(val){
      console.log(val)
      this.$global.httpGetWithToken(this,'order/all').then(res=>{
        res.data.forEach(item=>{
          if(item.lot.number == val.order && item.car.name == val.licenseNo){
            axios.post('http://39.104.135.253:8002/api/os/pt/hdIFS/state?token=a05478dde60e358e29145cdab82abb20',{name:item.car.name,lotId:item.lot._id,state:0,speed:0,angle:0,wheel:0,x:121.169674,y:31.278822,z:0}
            ).then(res=>{
              console.log(res)
            })
            //axios.post('http://localhost:8002/api/os/pt/hdIFS/state?token=a05478dde60e358e29145cdab82abb20',{name:item.car.name,lotId:item.lot._id,state:0,speed:0,angle:0,wheel:0,x:121.170173,y:31.279216,z:0}
            //).then(res=>{
            //  console.log(res)
            //})
          }
        })
      })

    },
    autoout(val){
      this.$global.httpGetWithToken(this,'order/all').then(res=>{
        res.data.forEach(item=>{
          if(item.lot.number == val.order && item.car.name == val.licenseNo && item.state >=10 && item.state <=12){
            console.log(val)
            this.$global.httpGet(this,'order/autoOut/'+item._id,{token:'bcd7df7f060d481b23ae27c53df3afe6'}).then(res=>{
              console.log(res.data)
                val.res = JSON.stringify(res)
            })
          }
        })
      })
    },
    pushHDPic(){
      axios.post('http://39.104.135.253:8002/api/os/pt/hdIFS/pic?token=a05478dde60e358e29145cdab82abb20',temp).then(res=>{
        console.log(res)
        val.res = JSON.stringify(res.data)
      })
    },
    pushOrderData(){
      var temp = {
        spId:2,
        serialNo:'dfkslafkalfla',
        payTime:new Date().getTime(),
        licenseNo:'京R00001',
        orderNo:'5c3d7e25db527b22aca24d01'
      }
      axios.post('http://39.104.135.253:8002/api/os/pt/sqIFS/requestPayDetail?token=bcd7df7f060d481b23ae27c53df3afe6',temp).then(res=>{
        console.log(res)
        val.res = JSON.stringify(res.data)
      })
    },
    //14e1b600b1fd579f47433b88e8d85291
    sqorder(val){                                                                                                                                 // 001 沪BYR267   002 沪B555H1  003 苏F GS118
      axios.post('http://39.104.135.253:8002/api/os/pt/sqIFS/order?token=bcd7df7f060d481b23ae27c53df3afe6',{spId:1,parkingGarageId:1,parkingLotAreaId:1,parkingLotId:val.order,orderTime:1,licenseNo:val.licenseNo}).then(res=>{
        console.log(res)
        val.res = JSON.stringify(res.data)
      })
    },
    sqcancel(val){
      axios.post('http://39.104.135.253:8002/api/os/pt/sqIFS/cancel?token=bcd7df7f060d481b23ae27c53df3afe6',{spId:1,parkingGarageId:1,parkingLotAreaId:1,parkingLotId:val.order,orderCancelTime:1,licenseNo:val.licenseNo}).then(res=>{
        console.log(res)
        val.res = JSON.stringify(res.data)
      })
    },
    sqlock(val){
      axios.post('http://39.104.135.253::8002/api/os/pt/sqIFS/lock?token=bcd7df7f060d481b23ae27c53df3afe6',{spId:1,parkingGarageId:1,parkingLotAreaId:1,parkingLotId:val.order,unlockReqTime:1,licenseNo:val.licenseNo}).then(res=>{
        console.log(res)
        val.res = JSON.stringify(res.data)
      })
    },
    sqenter(val){
      axios.post('http://39.104.135.253:8002/api/os/ds/ydIFS/state?token=b00f3b012dc4c55ac31c48b8dbae1724',
      {
          "dt": 1542684139077,
          "bat": 8.1,
          "dcode":'M18112S2033',
          "data": {
              "dt": "20181119153000",
              "nb": "W023",
              "power": "P90",
              "ls":"L102",
              "park": 1
          },
          "serial": 107,
          "type": 1,
          "gateway": "16011668966",
          "park": 2,
          "status": 2
      }).then(res=>{
        console.log(res)
        val.res = JSON.stringify(res.data)
      })
    },
    sqoff(val){
      axios.post('http://39.104.135.253:8002/api/os/ds/ydIFS/state?token=b00f3b012dc4c55ac31c48b8dbae1724',
      {
          "dt": 1542684139077,
          "bat": 8.1,
          "dcode":'M18112S2033',
          "data": {
              "dt": "20181119153000",
              "nb": "W023",
              "power": "P90",
              "ls":"L102",
              "park": 2
          },
          "serial": 107,
          "type": 1,
          "gateway": "16011668966",
          "park": 2,
          "status": 2
      }).then(res=>{
        console.log(res)
        val.res = JSON.stringify(res.data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wait{
  height: 100%;
}
.amap-wrapper {
  width: 100%;
  height:100%;
}
.lot-title {
  padding: 10px;
  font-size: 16px;
}
.lot-table {
  margin-bottom: 20px;
}
</style>
