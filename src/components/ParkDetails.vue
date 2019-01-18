<template>
  <div class="main">
    <div class="bodybg">
      <div class="leftcontent">

        <!-- 车辆入场纪录 -->
        <div class="subtitlediv">
          <img class="leftcorner" src="../assets/main/left_corner.png">
          <span class="subtitle">车辆入场纪录</span>
          <img class="rightcorner" src="../assets/main/right_corner.png">
        </div>
        <div class="duration2">
          <div class="sc">
            <table id="cartable">
              <thead>
                <tr class="table-header">
                  <th>车牌号</th>
                  <th>入场时间</th>
                </tr>
              </thead>
              <tr v-for="(entrance,index) in entrances" :class="{ alt: isActivefunc(index)}">
                <td style="color: #0be2ed">{{entrance.carBrand}}</td>
                <td>{{entrance.time}}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- 车辆缴费纪录 -->
        <div class="subtitlediv">
          <img class="leftcorner" src="../assets/main/left_corner.png">
          <!-- <label v-show="isActive" class="subtitle">停车场收费TOP5</label> -->
          <span class="subtitle">车辆缴费纪录</span>
          <img class="rightcorner" src="../assets/main/right_corner.png">
        </div>
        <div class="duration2">
          <div class="sc">
            <table id="cartable">
              <thead>
                <tr class="table-header">
                  <th>车牌号</th>
                  <th>出场时间</th>
                </tr>
              </thead>
              <tr v-for="(exit,index) in exits" :class="{ alt: isActivefunc(index)}">
                <td style="color: #0be2ed">{{exit.carBrand}}</td>
                <td>{{exit.time}}</td>
              </tr>
            </table>
          </div>
        </div>


<!-- 设备状态 -->
<div class="subtitlediv">
          <img class="leftcorner" src="../assets/main/left_corner.png">
          <!-- <label v-show="isActive" class="subtitle">停车场收费TOP5</label> -->
          <span class="subtitle">设备状态</span>
          <img class="rightcorner" src="../assets/main/right_corner.png">
        </div>
        <div class="duration2">
          <div class="leftbarequip">
            <p @click="lockfunc()" :class="{deepskyblue:lock}" style="padding-bottom:4px;cursor:pointer">地锁<img v-show="lock" style="margin-left:4px; width:6px" src="../assets/parkdetails/arrow.png"></p>
            <p @click="magfunc()" :class="{deepskyblue:mag}" style="padding-bottom:4px;cursor:pointer">地磁<img v-show="mag" style="margin-left:5px; width:6px" src="../assets/parkdetails/arrow.png"></p>
            <p @click="videofunc()" :class="{deepskyblue:video}" style="padding-bottom:4px;cursor:pointer">视频<img v-show="video" style="margin-left:5px; width:6px" src="../assets/parkdetails/arrow.png"></p>
          </div>

      <!-- 地锁 -->
          <div v-show="lock" class="sc2">
            <table id="cartable2">
              <thead>
                <tr class="table-header">
                  <th>编号</th>
                  <th>状态</th>
                  <th>通信</th>
                </tr>
              </thead>
              <tr v-for="(lock,index) in lockdata" :style="{backgroundColor:activeColor(lock.connection,index)}" :class="{ alt: isActivefunc(index)}">
                <td style="color: #0be2ed">{{lock.num}}</td>
                <td>{{lock.state}}</td>
                <td :class="{ green: green(lock.connection )}">{{lock.connection}}</td>
              </tr>
            </table>
          </div>

    <!-- 地磁 -->
          <div v-show="mag" class="sc2">
            <table id="cartable2">
              <thead>
                <tr class="table-header">
                  <th>编号</th>
                  <th>状态</th>
                  <th>通信</th>
                </tr>
              </thead>
              <tr v-for="(mag,index) in mags" :style="{backgroundColor:activeColor(mag.connection,index)}" :class="{ alt: isActivefunc(index)}">
                <td style="color: #0be2ed;">{{mag.num}}</td>
                <td>{{mag.state}}</td>
                <td :class="{ green: green(mag.connection )}">{{mag.connection}}</td>
              </tr>
            </table>
          </div>

<!-- 视频 -->
          <div v-show="video" class="sc2">
            <table id="cartable2">
              <thead>
                <tr class="table-header">
                  <th>编号</th>
                  <th>通信</th>
                </tr>
              </thead>
              <tr v-for="(video,index) in videos" :style="{backgroundColor:activeColor(video.connection,index)}" :class="{ alt: isActivefunc(index)}">
                <td style="color: #0be2ed">{{video.num}}</td>
                <td>{{video.state}}</td>
                <td :class="{ green: green(video.connection )}">{{video.connection}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div> <!-- leftdiv end -->


      <!-- mid div -->
      <div class="midcontent">
        <div class="midtop">
          <span style="font-size:21pt;display:block" class="deepskyblue">博览公园停车场</span>
          <div class="carbutton brightgreen">自动驾驶车辆数</div>
          <div class="carbutton brightgreen">人工驾驶车辆数</div>
          <div class="dealframe">
            <div style="margin-bottom:8px; color:#ddbb00">213</div>
            <div class="deepskyblue">当日交易笔数</div>
          </div>
          <div class="dealframe">
            <div style="margin-bottom:8px; color:#ddbb00">¥2433</div>
            <div class="deepskyblue">当日交易笔数</div>
          </div>
        </div>
        <div class="amap-wrapper">
          <el-amap vid="amapDemo" :zoom="map.zoom" :center="map.position" :mapStyle="map.mapStyle">
            <el-amap-marker
              v-for="marker in markers"
              :position="marker.position"
              :events="marker.events"
              :visible="marker.visible"
              :content="marker.content"
            ></el-amap-marker>
          </el-amap>
        </div>
      </div>

      <!-- right div -->
      <div class="rightcontent">
        <div class="subtitlediv">
          <img class="leftcorner" src="../assets/main/left_corner.png">
          <span class="subtitle">12小时收费金额分布</span>
          <img class="rightcorner" src="../assets/main/right_corner.png">
        </div>

        <div class="duration2">
          <div id="myChart3" :style="{width: '100%', height: '220px'}"></div>
        </div>

        <div class="subtitlediv">
          <img class="leftcorner" src="../assets/main/left_corner.png">

          <span class="subtitle">12小时车位使用饱和率图标</span>
          <img class="rightcorner" src="../assets/main/right_corner.png">
        </div>

        <div class="duration2">
          <div id="myChart4" :style="{width: '100%', height: '220px'}"></div>
        </div>

        <div class="subtitlediv">
          <img class="leftcorner" src="../assets/main/left_corner.png">
          <span class="subtitle">停车时长统计</span>

          <img class="rightcorner" src="../assets/main/right_corner.png">
        </div>

        <div class="duration2">
          <div id="myChart2" :style="{width: '100%', height: '220px'}"></div>
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
      option12: {
        color: ["#3398DB"],
        grid: {
          left: "0%",
          right: "10%",
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
            ],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#0c3b71"
              }
            },
            axisLabel: {
              show: true,
              color: "#0be2ed",
              fontSize: 12
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
                }
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
              2330,
              2447,
              5661,
              3381,
              4523,
              6445,
              2233,
              4243,
              1367,
              2345,
              4276,
              1245,
              3376
            ],
            zlevel: 11
          }
        ]
      },

      lockdata:[
        {
          num:"A234",
          state:"升起",
          connection:"正常"
        },
        {
          num:"A234",
          state:"升起",
          connection:"正常"
        },
        {
          num:"A234",
          state:"升起",
          connection:"正常"
        },
        {
          num:"A234",
          state:"升起",
          connection:"正常"
        },
        {
          num:"A234",
          state:"--",
          connection:"失联"
        },
        {
          num:"A234",
          state:"升起",
          connection:"正常"
        },
        {
          num:"A234",
          state:"升起",
          connection:"正常"
        },
        {
          num:"A234",
          state:"升起",
          connection:"正常"
        },
        {
          num:"A234",
          state:"升起",
          connection:"正常"
        },
      ],
      mags:[
        {
          num:"D2634",
          state:"升起",
          connection:"正常"
        },
        {
          num:"D2634",
          state:"降下",
          connection:"正常"
        },
        {
          num:"D2634",
          state:"--",
          connection:"失联"
        },
        {
          num:"D2634",
          state:"降下",
          connection:"正常"
        },
        {
          num:"D2634",
          state:"升起",
          connection:"正常"
        },

      ],
       videos:[
        {
        num:"S23",
        connection:"正常"
        },
        {
        num:"S23",
        connection:"正常"
        },
        {
        num:"S23",
        connection:"正常"
        },
        {
        num:"S23",
        connection:"正常"
        },

      ],
      entrances:[
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        }
      ],
      exits:[
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
        {
        carBrand:"京S3321",
        time:"13:42:33"
        },
      ],
      isActive: true,
      parkData: [],
      map: {
        zoom: 18,
        // position:[121.5273285, 31.21715058],
        position: [121.215772, 31.285732],
        mapStyle: "amap://styles/33da2327882ec370f6a78c5a6a24a160"
      },
      markers: [],
      places: [
        "斗南花花世界",
        "江西宾馆",
        "华山",
        "萍乡高铁停车场",
        "常熟人民医院"
      ],

      //TOP5数据
      top5: {
        title: {},
        grid: {
          x: 0,
          y: 55,
          // x2:300,
          y2: 20
          // borderWidth:23
          // containLabel: true
        },
        tooltip: {
          show: false
        },
        xAxis: {
          show: false,
          splitLine: {
            //网格线
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },

        yAxis: {
          type: "category",
          max: 3,
          splitLine: {
            //网格线
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            barWidth: 7,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  1,
                  0,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#0be2ed"
                    },
                    {
                      offset: 0.8,
                      color: "#0ab0ea"
                    }
                  ],
                  false
                )
              }
            },
            type: "bar",
            data: [1803, 2249, 3234, 3970, 5744],
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff"
                },
                position: "insideTopRight",
                distance: -15
              }
            }
          }
        ]
      },

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

      parkUsed: {
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
            max: 140,
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
              }
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
            data: [90, 105, 84, 125, 120, 92, 98, 90, 105, 104, 125, 130, 122]
          }
        ]
      }
    };
  },
  created() {
    this.getParkList();
  },
  mounted() {
    this.drawLine();
    console.log(this.duration());
  },
  methods: {
    lockfunc(){
      this.lock=true,
      this.mag=false,
      this.video=false
    },
    magfunc(){
      this.lock=false,
      this.mag=true,
      this.video=false
    },
    videofunc(){
      this.lock=false,
      this.mag=false,
      this.video=true
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
    drawLine() {
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      let myChart4 = this.$echarts.init(document.getElementById("myChart4"));
      // 绘制图表
      myChart2.setOption(this.duration());
      myChart3.setOption(this.option12);
      myChart4.setOption(this.parkUsed);
    },
    fe() {
      this.isActive = true;
    },
    fe2() {
      this.isActive = false;
    },
    getParkList() {
      this.parkData = [
        { a: 1, b: 5, lat: 121.527, lng: 31.217 },
        { a: 2, b: 3, lat: 121.5273285, lng: 31.21715058 },
        { a: 3, b: 4, lat: 121.5275, lng: 31.2174 }
      ];
      this.addMarker();
    },
    addMarker() {
      this.parkData.forEach(item => {
        var tempImg;
        switch (item.a) {
          case 1:
            tempImg = require("../assets/main/a1.png");
            break;
          case 2:
            tempImg = require("../assets/main/a2.png");
            break;
          case 3:
            tempImg = require("../assets/main/a3.png");
            break;
          default:
        }
        var marker = {
          content:
            '<div style="width:44px;text-align:center;"><img src="' +
            tempImg +
            '" style="width:100%"><span style="color:white;position:absolute;top:1px;right:7px">' +
            item.b +
            "</span></div>",
          position: [item.lat, item.lng],
          events: {
            click: () => {
              // this.$router.push({name:"user_data",params:""})
              console.log(item);
            }
          },
          visible: true
        };
        this.markers.push(marker);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.green{
  color: rgb(38, 240, 156);
}

.scroll::-webkit-scrollbar {
  display: none;
}
#myChart4 {
  margin-left: 5px;
}

#myChart3 {
  margin-left: 15px;
}

.duration2 {
  position: relative;
  background-image: url("../assets/main/frame.png") ;
  background-size:100% 100%;
  background-repeat: no-repeat;
  height: 220px;
  margin-bottom: 25px;
}

#myChart2 {
  margin: auto;
  /* background-color: rgb(187, 187, 187); */
}
.top5 {
  background-image: url("../assets/main/frame.png")  no-repeat; background-size:100% 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  height: 220px;
  width: 430px;
  /* background-color: rgba(245, 21, 21, 0.644); */
}

.top5place {
  width: 170px;
  height: 220px;
  /* background-color: rgba(214, 26, 26, 0.288); */
  /* display:inline-block; */
  float: left;
  /* padding-left:20px; */
  padding-top: 10px;
  text-align: right;
}
#myChart {
  display: inline-block;
  /* background-color: rgba(63, 110, 9, 0.308); */
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
  height: 30px;
  margin-bottom: 15px;
}

.subtitle {
  color: deepskyblue;
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
}
.amap-wrapper {
  width: 100%;
  height: 590px;
  /* position: absolute;
  left: 0;
  z-index: -1; */
  /* display: inline-block; */
}

.bodybg {
  width: 100%;
  height: 100%;
  background-image: url("../assets/parkdetails/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: fixed;

  /* background-color: rgba(9, 25, 66, 0.95); */
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
  /* background-color: rgba(218, 219, 126, 0.98); */
  /* border: sandybrown solid 1px; */
  padding: 10px;
  /* margin-right: 18px; */
}
.midcontent {
  position: absolute;
  left: 30%;
  width: 40%;
  height: 100%;
  /* background-color: rgba(21, 219, 126, 0.98); */
  /* border: rgb(113, 244, 96) solid 1px; */
  padding: 10px;
  /* margin-right: 18px; */
}

.midtop{
  width: 100%;
  height: 250px;
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
  background-color: rgba(16, 104, 159, 0.26);
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


#cartable2 {
  font-family: Arial, Helvetica, sans-serif;
  width:100%;
  border-collapse: collapse;
  color: #fff;
  text-align: center;
  float: left;
  /* overflow-y: scroll; */
  /* height: 100%; */
}

#cartable2 tr.alt td {
  /* color: #fff; */
  /* background-color: rgba(16, 104, 159, 0.26); */
  font-size: 1em;
  border: none;
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
