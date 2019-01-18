<template>
<!-- #CAC577 -->
  <div class="main">
    <div class="leftbar">
      <label class="title">标题</label>

      <div class="dealframe">
        <span class="dealnumtop1">1234</span>
        <span class="dealnum deepskyblue">当日交易笔数</span>
      </div>
      <div class="dealframe">
        <span class="dealnumtop1">¥9323</span>
        <span class="dealnum deepskyblue">当日交易金额</span>
      </div>

      <div class="selectdata">
        <div v-bind:class="{ bgcolor: isActive }" class="leftsecleted" @click="clickleft">
          <span>数据1</span>
        </div>
        <div
          v-bind:class="{ bgcolor: !isActive }"
          class="leftsecleted rightsecleted"
          @click="clickright"
        >
          <span>数据2</span>
        </div>
        <img class="dataframe" src="../assets/main/selectdata.png">
      </div>

      <div class="subtitlediv">
        <img class="leftcorner" src="../assets/main/left_corner.png">
        <label v-show="isActive" class="subtitle">停车场收费TOP5</label>
        <label v-show="!isActive" class="subtitle">12小时收费金额分布</label>
        <img class="rightcorner" src="../assets/main/right_corner.png">
      </div>

      <div class="top5">
        <!-- <img class="frame" src="../assets/main/frame.png" > -->
        <div v-show="isActive" class="top5place">
          <p v-for="(place,index) in places">
            {{place}}
            <span class="brightgreen">No.{{++index}}</span>
          </p>
        </div>

        <div v-show="isActive" id="myChart" :style="{width: '260px', height: '220px'}"></div>

        <div v-show="!isActive" id="myChart3" :style="{width: '440px', height: '220px'}"></div>
      </div>

      <div class="subtitlediv">
        <img class="leftcorner" src="../assets/main/left_corner.png">
        <label v-show="isActive" class="subtitle">停车时长统计</label>
        <label v-show="!isActive" class="subtitle">12小时车位使用饱和率图标</label>
        <img class="rightcorner" src="../assets/main/right_corner.png">
      </div>

      <div class="duration2">
        <!-- <img class="frame" src="../assets/main/frame.png" > -->
        <div v-show="isActive" id="myChart2" :style="{width: '340px', height: '220px'}"></div>
        <div v-show="!isActive" id="myChart4" :style="{width: '420px', height: '220px'}"></div>
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
</template>

<script>
import { AMapManager } from "vue-amap";

export default {
  name: "Main",
  data() {
    return {
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

      //12小时车位使用饱和率图标
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
      }
    };
  },
  created() {
    this.getParkList();
  },
  mounted() {
    this.drawLine();
  },
  methods: {

    //停车时长
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
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      let myChart4 = this.$echarts.init(document.getElementById("myChart4"));
      // 绘制图表
      myChart.setOption(this.top5);
      myChart2.setOption(this.duration());
      myChart3.setOption(this.option12);
      myChart4.setOption(this.parkUsed);
    },
    clickleft() {
      this.isActive = true;
    },
    clickright() {
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
#myChart4 {
  margin-left: 5px;
}

#myChart3 {
  margin-left: 15px;
}
.duration2 {
  background-image: url("../assets/main/frame.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 220px;
}
#myChart2 {
  margin: auto;
  /* background-color: rgb(187, 187, 187); */
}
.top5 {
  background-image: url("../assets/main/frame.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 220px;
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
  margin-left: 5px;
  margin-right: 5px;
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
  margin-top: 32px;
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

.bgcolor {
  background-color: rgba(46, 211, 252, 0.57);
}

.dataframe {
  width: 100%;
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
  width: 100%;
}

.dealnumtop1 {
 color:#ddbb00;
  display: block;
  margin-bottom: 11px;
}

.dealframe {
  margin-right: 13px;
  padding-top: 19px;
  font-size: 14pt;
  width: 150px;
  height: 100px;
  text-align: center;
  display: inline-block;
  background-image: url("../assets/main/dealframe.png");
  background-repeat: no-repeat;
  color: #fff;
  margin-bottom: 28px;
  background-size: 100%;
}

.main {
  font-family: 宋体;
  font-weight: bold;
}
.amap-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}

.leftbar {
  width: 450px;
  height: 100%;
  background-color: rgba(9, 25, 66, 0.95);
  position: absolute;
  z-index: 2;
  padding: 10px;
  overflow: scroll;
}

.leftbar::-webkit-scrollbar {
  display: none;
}
</style>
