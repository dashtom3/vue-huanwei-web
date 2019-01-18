<template>
<!-- #CAC577 -->
  <div class="main">
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
  name: "Index",
  data() {
    return {
      isActive: true,
      parkData: [],
      map: {
        zoom: 14,
        // position:[121.5273285, 31.21715058],
        position: [121.215772, 31.285732],
        mapStyle: "amap://styles/33da2327882ec370f6a78c5a6a24a160"
      },
      markers: [],
    }
  },
  created() {
    // this.getParkList();
  },
  mounted() {
    // this.drawLine();
  },
  methods: {
    getParkList(){
      this.$global.httpGetWithToken(this,'park/all').then(res=>{
          console.log(res.data)
          this.parkData = res.data
          this.addMarker();
      })
    },
    // getParkList() {
    //   this.$global.httpGetWithToken('')
    //
    // },
    addMarker() {
      this.parkData.forEach(item => {
        var tempImg;
        switch (item.level) {
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
            '" style="width:100%"><span style="color:white;position:absolute;right:6px;">' +
            item.number +
            "</span></div>",
          position: [item.lat, item.lng],
          events: {
            click: () => {
              this.$router.push({name:"Park2"})
              // console.log(item);
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
