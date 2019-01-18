<template>
  <div class="main">
    <div class="bodybg">
      <div class="leftcontent">
        <div class="sub-tit">
        <!-- 车辆入场纪录 -->
        <div class="subtitlediv">
          <img class="leftcorner" src="../assets/main/left_corner.png">
          <span class="subtitle">车辆入场纪录</span>
          <img class="rightcorner" src="../assets/main/right_corner.png">
          <div class="main-bug">
            <span v-bind:class="{isBugActive:selectType == 0}" @click="changeCarType(0)">自动</span>
            <span v-bind:class="{isBugActive:selectType == 1}" @click="changeCarType(1)">人工</span>
          </div>
        </div>
        <div class="duration2">
          <div class="sc">
            <table id="cartable">
              <thead>
                <tr class="table-header">
                  <th>车牌号</th>
                  <th>状态</th>
                  <th>停车位</th>
                </tr>
              </thead>
              <tr v-for="(entrance,index) in selectTable" :class="{ alt: isActivefunc(index)}" style="height:40px">
                <td style="color: #eeeeee">{{entrance.carBrand}}</td>
                <td style="color: #eeeeee">{{entrance.state}}</td>
                <td v-if="entrance.state == '泊车中'" style="color: #67C23A">{{entrance.lot}}</td>
                <td v-if="entrance.state != '泊车中'" style="color: #F56C6C">{{entrance.lot}}</td>
              </tr>
            </table>
          </div>
        </div>
        </div>
        <div class="sub-tit">
        <!-- 车辆缴费纪录 -->
        <div class="subtitlediv">
          <img class="leftcorner" src="../assets/main/left_corner.png">
          <span class="subtitle">停车场运营状况</span>
          <img class="rightcorner" src="../assets/main/right_corner.png">
          <div class="main-bug">
            <span v-bind:class="{isBugActive:selectPic == 0}" @click="changeLeftType(0)">占用率</span>
            <span v-bind:class="{isBugActive:selectPic == 1}" @click="changeLeftType(1)">延误率</span>
            <span v-bind:class="{isBugActive:selectPic == 2}" @click="changeLeftType(2)">平均时长</span>
          </div>
        </div>
        <div class="duration2">
          <!-- <div id="myChart2" :style="{width: '100%', height: '100%'}"></div> -->
          <div id="myChart3" :style="{width: '100%', height: '100%'}"></div>
          <!-- <div id="myChart4" :style="{width: '100%', height: '220px'}"></div> -->
        </div>
      </div> <!-- leftdiv end -->
      </div>

      <!-- mid div -->
      <div class="midcontent">
        <!-- <div class="midtop">
          <span style="font-size:21pt;display:block" class="deepskyblue">博览公园停车场</span>
        </div> -->
        <div class="amap-wrapper">
          <el-amap vid="amapDemo" :zoom="map.zoom" :expandZoomRange=true :center="map.position" :mapStyle="map.mapStyle">
            <el-amap-marker
              v-for="marker in markers"
              :position="marker.position"
              :events="marker.events"
              :visible="marker.visible"
              :content="marker.content"
            ></el-amap-marker>
            <el-amap-marker
              v-for="marker in markers2"
              :position="marker.position"
              :events="marker.events"
              :visible="marker.visible"
              :content="marker.content"
            ></el-amap-marker>
            <el-amap-polyline strokeColor="#E2AF03"   :path="map.polyline.path" :visible="map.polyline.visible" :events="map.polyline.events"></el-amap-polyline>
            <el-amap-polyline  strokeColor="#1BAC2E" :path="map.polyline2.path" :visible="map.polyline2.visible" :events="map.polyline2.events"></el-amap-polyline>
            <el-amap-polyline  strokeColor="#990099" :path="map.polyline3.path" :visible="map.polyline3.visible" :events="map.polyline3.events"></el-amap-polyline>
          </el-amap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";

export default {
  name: "Main",
  data() {
    return {
      selectType:0,
      selectPic:0,
      selectTable:null,
      lock:true,
      mag:false,
      video:false,
      isActivefunc:function(index){
        if(index%2==0){
          return true
        }else{
           return false
        }
      },
      green:function(data){
        if(data=="正常")return true
      },
      activeColor: function(data,index){
         if(index%2!=0 && data=="失联" ){return '#6d1a1a'}

        if(index%2==0){
          if(data=="失联") { return '#6d1a1a'}
          else {return 'rgba(16, 104, 159, 0.26)'}
        }


        // if(index%2==0) return 'rgba(16, 104, 159, 0.26)'
      },
      //12小时收费金额分布
      option: [
        {
        tooltip: {},
        grid: {
          top: "12%",
          left: "1%",
          right: "4%",
          bottom: "6%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "#233e64"
              }
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#0be2ed",
                margin: 15
              }
            },
            axisTick: { show: false },
            data: [
              "8:00",
              "",
              "10:00",
              "",
              "12:00",
              "",
              "14:00",
              "",
              "16:00",
              "",
              "18:00",
              "",
              "20:00"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: 100,
            splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#233e64"
              }
            },
            axisLine: { show: false },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "#fff"
              },
              formatter: '{value}%'
            },
            axisTick: { show: false }
          }
        ],
        series: [
          {
            name: "异常流量",
            type: "line",
            smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            symbolSize: 0,

            lineStyle: {
              normal: {
                color: "#3deaff" // 线条颜色
              }
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "rgba(61,234,255, 1)" },
                    { offset: 1, color: "rgba(61,234,255, 0.1)" }
                  ],
                  false
                ),

                shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: [60, 75, 76, 75, 80, 80, 76, 76, 92, 60, 65, 70, 60]
          }
        ]
      },
      {
        color: ["#3398DB"],
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "10%",
          height: "85%",
          containLabel: true,
          z: 22
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            name:'停车时长',
            nameLocation:'middle',
            data: [
              "<1h",
              "<2h",
              "<3h",
              "<4h",
              "<5h",
              ">5h"
            ],
            // axisTick: {
            //   alignWithLabel: true
            // },
            axisLine: {
              lineStyle: {
                color: "#999999"
              }
            },
            axisLabel: {
              show: true,
              color: "#0be2ed",
              fontSize: 12,
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            gridIndex: 0,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#0c3b71"
              }
            },
            axisLabel: {
              show: false,
              color: "rgba(250,250,250,0.5)",
              formatter: function(value) {
                var texts = [];
                if (value == 0) {
                  texts.push("0");
                } else if (value <= 1000) {
                  texts.push(1000);
                } else if (value <= 2000) {
                  texts.push();
                } else if (value <= 3000) {
                  texts.push(3000);
                } else if (value <= 4000) {
                  texts.push();
                } else if (value <= 5000) {
                  texts.push(5000);
                } else if (value <= 6000) {
                  texts.push();
                } else if (value <= 7000) {
                  texts.push(7000);
                }
                return texts;
              }
            }
          },
          {
            type: "value",
            gridIndex: 0,
            splitNumber: 24,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false,
              areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "42%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize: 11
                },
                formatter:'{c}%'
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#0be2ed"
                  },
                  {
                    offset: 1,
                    color: "#0ab0ea"
                  }
                ])
              }
            },
            data: [
              10,
              5,
              15,
              14,
              15,
              10
            ],
            zlevel: 11
          }
        ]
      }],
      entrances:[
      [],[]],

      isActive: true,
      parkData: [],
      map: {
        polyline: {
            path: [ [121.168215,31.280486], [121.168226,31.280413],[121.168231,31.280303],
            [121.168253,31.280193],[121.168258,31.280096],[121.168263,31.279986],[121.168263,31.279821],
            [121.168381,31.279739],[121.168521,31.279629],[121.168633,31.279541],[121.168682,31.279496],
            [121.168816,31.279404],[121.168912,31.279317],[121.169009,31.279211],[121.169127,31.279074],
            [121.169240,31.278936],[121.169331,31.278964],[121.169454,31.279046],[121.169481,31.279056]],
            events: {
              click(e) {
                alert('click polyline');
              },
              end: (e) => {
                let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
                console.log(newPath);
              }
            },
            visible:false,
            },
            polyline2: {
            path: [ [121.169481,31.279056], [121.169454,31.279046],[121.169331,31.278964],
            [121.169240,31.278936],[121.169331,31.278817],[121.169390,31.278666],[121.169438,31.278615],
            [121.169545,31.278716],[121.169674,31.278822],[121.169814,31.278927],[121.169910,31.279056],
            [121.170017,31.279129],[121.170173,31.279216],[121.170361,31.279243],[121.170597,31.279248]],
            events: {
              click(e) {
                alert('click polyline');
              },
              end: (e) => {
                let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
                console.log(newPath);
              }
            },
            visible:false,
            },
             polyline3: {
            path: [ [121.170774,31.279193], [121.170806,31.279321],[121.170827,31.279422],
            [121.170645,31.279386],[121.170441,31.279381],[121.170259,31.279372],[121.170050,31.279340],
            [121.169835,31.279276],[121.169658,31.279198],[121.169502,31.279097],[121.169481,31.279056]],
            events: {
              click(e) {
                alert('click polyline');
              },
              end: (e) => {
                let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
                console.log(newPath);
              }
            },
            visible:false,
            },
        zoom: 20,
        // position:[121.5273285, 31.21715058],
        // position: [121.16671,31.279965],
        position:[121.17062,31.278481],
        mapStyle: "amap://styles/33da2327882ec370f6a78c5a6a24a160"
      },
      markers: [],
      markers2:[],
      //停车时长数据
      parkTime: [
        {
          name: "1小时",
          value: 15
        },
        {
          name: "半小时",
          value: 15
        },
        {
          name: "2小时",
          value: 20
        },
        {
          name: "3小时",
          value: 27
        },
        {
          name: "其他",
          value: 23
        }
      ],
    };
  },
  created() {
    this.option.push(this.duration())
    setInterval(()=>{
      this.getOrderList()
    },10000)
    this.getOrderList()
    this.getParkList()
    this.selectTable = this.entrances[0]
  },
  mounted() {
    this.$nextTick(()=>{
      this.drawLine(0);
    })
    // console.log(this.duration());
  },
  methods: {
    getOrderList(){
      this.$global.httpGetWithToken(this,'order/all').then(res=>{
        console.log(res)
        // var temp = [[],[]]
        this.entrances = [[],[]]
        this.markers2 = []
        var temp = [false,false,false]
        res.data.forEach(item=>{
          var i = item.type == 0 ? 1:0 //type = 0 人工
          if(item.state>2 && item.state <10){
            this.entrances[i].push({carBrand:item.car.name,state:'泊车中',lot:item.lot.number})
            temp[1] = true
            this.addMarker2(item)
          }else if(item.state == 10){
            this.entrances[i].push({carBrand:item.car.name,state:'停车中',lot:item.lot.number})
            this.addMarker2(item)
            // temp[1] = true
          }else if(item.state > 10 && item.state < 13){
            this.entrances[i].push({carBrand:item.car.name,state:'离场中',lot:item.lot.number})
            this.addMarker2(item)
            temp[2] = true
          }
        })
        this.map.polyline.visible = temp[0]
        this.map.polyline2.visible = temp[1]
        this.map.polyline3.visible = temp[2]
        // this.entrances = temp
        this.selectTable = this.selectType == 0?this.entrances[0]:this.entrances[1]
      })
    },
    addMarker2(order) {
            if(order.coo_x !=0){
              var tempImg = require("../assets/main/point.png");
              var marker = {
                content:
                  '<div style="width:100px;text-align:left;"><img src="'+tempImg+'" style="width:10%;margin-left:18px;margin-top:18px;"><span style="font-size:12px;background-color:rgba(100,100,100,0.8)">'+order.car.name+'</span></div>',
                position: [parseFloat(order.coo_x), parseFloat(order.coo_y)],
                events: {
                  click: () => {
                    // this.$router.push({name:"user_data",params:""})
                    console.log(item);
                  }
                },
                visible: true
              };
              this.markers2.push(marker);
            }
    },
    changeCarType(num){
      this.selectType = num
      this.selectTable = this.entrances[num]
    },
    changeLeftType(num){
      this.selectPic = num
      console.log(this.selectPic)
      this.drawLine(num)
    },

    duration() {
      var scaleData = this.parkTime;
      var rich = {
        white: {
          color: "#fff",
          align: "center",
          padding: [5, 0]
        }
      };
      var placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: "rgba(0, 0, 0, 0)",
          borderColor: "rgba(0, 0, 0, 0)",
          borderWidth: 0
        }
      };
      var data = [];
      for (var i = 0; i < scaleData.length; i++) {
        data.push(
          {
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
              normal: {
                borderWidth: 3,
                shadowBlur: 30,
                borderColor: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#0ab0ea"
                    },
                    {
                      offset: 1,
                      color: "#0be2ed"
                    }
                  ]
                ),
                shadowColor: "rgba(142, 152, 241, 0.3)"
              }
            }
          },
          {
            value: 4,
            name: "",
            itemStyle: placeHolderStyle
          }
        );
      }
      var seriesObj = [
        {
          name: "",
          type: "pie",
          center: ["50%", "55%"],
          clockWise: false,
          radius: [76, 79],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "outside",
                color: "#0be2ed",
                formatter: function(params) {
                  var percent = 0;
                  var total = 0;
                  for (var i = 0; i < scaleData.length; i++) {
                    total += scaleData[i].value;
                  }
                  percent = ((params.value / total) * 100).toFixed(0);
                  if (params.name !== "") {
                    return params.name + "\n{white|" + "占比" + percent + "%}";
                  } else {
                    return "";
                  }
                },
                rich: rich
              },
              labelLine: {
                show: false
              }
            }
          },
          data: data
        }
      ];
      var option = {
        title : {
            subtext: '平均停车时长占比',
            x:'center'
        },
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        toolbox: {
          show: false
        },
        series: seriesObj
      };
      return option;
    },
    drawLine(num) {
      // let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      // myChart3.setOption(null)
      myChart3.clear()
      myChart3.setOption(this.option[num]);
    },
    getParkList() {
      // this.parkData = [
      //   { a: 1, b: 5, lat: 121.527, lng: 31.217 },
      //   { a: 2, b: 3, lat: 121.5273285, lng: 31.21715058 },
      //   { a: 3, b: 4, lat: 121.5275, lng: 31.2174 }
      // ];
      this.$global.httpGetWithToken(this,'park/all').then(res=>{
          console.log(res.data)
          this.parkData = res.data
          this.addMarker();
      })
      // this.addMarker();
    },
    addMarker() {
      this.parkData.forEach(item => {
        item.area.forEach(area=>{
          area.lot.forEach(lot=>{
            if(lot.x !=0){
              var tempImg = require("../assets/main/lot.png");
              var marker = {
                content:
                  // '<div style="width:6px;text-align:center;"><img src="' +
                  // tempImg +
                  // '" style="width:100%"><span style="font-size:12px;color:white;position:absolute;top:1px;right:7px">' +
                  // lot.number +
                  // "</span></div>",
                  '<div style="width:6px;text-align:center;"><img src="'+tempImg+'" style="width:100%"></div>',
                position: [parseFloat(lot.coordinate_x), parseFloat(lot.coordinate_y)],
                events: {
                  click: () => {
                    // this.$router.push({name:"user_data",params:""})
                    console.log(item);
                  }
                },
                visible: true
              };
              this.markers.push(marker);
            }

          })
        })

      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.isBugActive {
  border-bottom: 2px solid white;
  color:white;
}
.green{
  color: rgb(38, 240, 156);
}
.sub-tit {
  height: 50%;
  padding:10px;
}
.scroll::-webkit-scrollbar {
  display: none;
}
#myChart4 {
  margin: auto;
  /* margin-left: 5px; */
}

#myChart3 {
  margin: auto;
  /* margin-left: 15px; */
}
#myChart2 {
  margin: auto;
  /* background-color: rgb(187, 187, 187); */
}

#myChart {
  display: inline-block;
  /* background-color: rgba(63, 110, 9, 0.308); */
}
.duration2 {
  position: relative;
  background-image: url("../assets/main/frame.png") ;
  background-size:100% 100%;
  background-repeat: no-repeat;
  /* height: 220px; */
  margin-top: 2%;
  height: 88%;
  /* margin-bottom: 25px; */
}


p {
  color: white;
  line-height: 20px;
  /* display: inline-block; */
}
.deepskyblue {
  color: #00bfff;
}
.brightgreen {
  color: #0be2ed;
}
.leftcorner {
  float: left;
}
.rightcorner {
  float: left;
  margin-top: 20px;
}

.subtitlediv {
  width: 100%;
  height: 12%;
  margin-bottom: 2%;
  /* border-bottom:1px solid #999999; */
  /* margin-bottom: 15px; */
}
.main-bug {
  float: right;
  color: #999999;
  margin-top: 5px;
}
.main-bug span{
  cursor: pointer;
}
.subtitle {
  color: white;
  font-size: 14pt;
  float: left;
  margin-top: 6px;
  margin-left: -3px;
  margin-right: -3px;
}
.table-header {
  border-bottom:solid #0f4776 2px;
  height: 40px;
}
.bgcolor {
  background-color: rgba(46, 211, 252, 0.57);
}

.dataframe {
  width: 300px;
  height: 100%;
  display: block;
}

.leftsecleted {
  position: absolute;
  width: 152px;
  height: 41px;
  margin: 4px;
  color: #fff;
  text-align: center;
  padding-top: 11px;
  font-size: 14pt;
  cursor: pointer;
}
.rightsecleted {
  left: 160px;
}

.selectdata {
  position: relative;
  width: 320px;
}
.title {
  color: deepskyblue;
  font-size: 18pt;
  display: block;
  margin-bottom: 30px;
}

.frame {
  width: 150px;
}

.dealnumtop1 {
  color: white;
  display: block;
  margin-bottom: 11px;
}

.dealframe {
  margin-top: 26px;
  /* margin-right:77px;
  margin-left: 71px; */
  margin-right: 20px;
  margin-left: 20px;
  padding-top: 10px;
  font-size: 13pt;
  width: 150px;
  height: 100px;
  text-align: center;
  display: inline-block;
  background-image: url("../assets/parkdetails/dealframe.png");
  background-repeat: no-repeat;
  color: #fff;
  margin-bottom: 28px;
  background-size: 100%;
}

.main {
  font-family: 微软雅黑;
  height: 100%;
}
.amap-wrapper {
  width: 100%;
  height: 100%;
  text-align: center;
  /* padding-top: 300px; */
  color:white;
  background-color: #444444;
  opacity:0.9;
  /* position: absolute;
  left: 0;
  z-index: -1; */
  /* display: inline-block; */

}

.bodybg {
  width: 100%;
  height: 100%;
  /* background-image: url("../assets/parkdetails/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: fixed; */

  background-color: #1D1D1D;
  /* position: absolute;
  z-index: 2; */
  /* padding: 10px; */
  overflow: scroll;
}
.bodybg::-webkit-scrollbar {
  display: none;
}
/* .bodybg::-webkit-scrollbar {
  display: none;
} */

.leftcontent {
  position: absolute;
  width: 30%;
  height: 100%;
}
.midcontent {
  position: absolute;
  left: 30%;
  width: 70%;
  height: 100%;
  /* background-color: rgba(21, 219, 126, 0.98); */
  /* border: rgb(113, 244, 96) solid 1px; */
  /* padding: 10px; */
  /* margin-right: 18px; */
}

.midtop{
  width: 100%;
  text-align: center
}

.carbutton{
  width: 40%;
  height: 50px;
  border:solid 1px #134f83;
  display: inline-block;
  margin-top: 30px;
  margin-right:15px;
  margin-left: 15px;
  font-size: 15pt;
  padding: 10px;
}

.rightcontent {
  position: absolute;
  right: 0px;
  width: 30%;
  height: 100%;
  /* background-color: rgba(58, 102, 214, 0.98); */
  /* border: rgb(192, 50, 161) solid 1px; */
  padding: 10px;
}

/* table */
.sc {
  overflow-y: scroll;
  height:100%;
  margin: auto;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
.sc::-webkit-scrollbar {
  width: 10px;
  height: 5px;
  background-color: rgba(11, 226, 237, 0.22);
}
/*定义滚动条轨道
 内阴影+圆角*/
.sc::-webkit-scrollbar-track {
  /* -webkit-box-shadow:inset 0 0 0 rgba(0,0,0,0.1); */

  /* background-color:rgba(11, 226, 237, 0.22); */
}
/*定义滑块
 内阴影+圆角*/
.sc::-webkit-scrollbar-thumb {
  /* -webkit-box-shadow:inset 0 0 0 rgba(0,0,0,.3); */
  background-color: #0ab0ea;
}



#cartable {
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  text-align: center;
}

#cartable tr.alt td {
  /* color: #fff; */
  background-color: #545454;
  /* font-size: 1em; */
  border: none;
}

.sc2 {
  overflow-y: scroll;
  height: 100%;
  /* width: 316px; */
  margin: auto;
  float: left;
  width: 70%;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
.sc2::-webkit-scrollbar {
  width: 10px;
  height: 5px;
  background-color: rgba(11, 226, 237, 0.22);
}
/*定义滚动条轨道
 内阴影+圆角*/
.sc2::-webkit-scrollbar-track {
  /* -webkit-box-shadow:inset 0 0 0 rgba(0,0,0,0.1); */

  /* background-color:rgba(11, 226, 237, 0.22); */
}
/*定义滑块
 内阴影+圆角*/
.sc2::-webkit-scrollbar-thumb {
  /* -webkit-box-shadow:inset 0 0 0 rgba(0,0,0,.3); */
  background-color: #0ab0ea;
}


.leftbarequip{
  /* margin:auto; */
  float: left;
  padding-left:10%;
  height: 100%;
  padding-top:10px;
  width: 30%;
  /* background-color: #fff; */
  border-right: solid 1px #0f4776;
}

.tablehead {
  height: 44px;
  border-bottom: solid #0f4776 2px;
  margin-bottom: 10px;
  margin-left: 15px;
  color: white;
  text-align: left;
  padding-top: 15px;
}
</style>
