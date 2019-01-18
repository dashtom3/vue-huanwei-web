
<template>
  <div class="app">
    <div class="left-container">
      <div class="left-top-div">
        <header class="blue">单车动态管理信息</header>
        <div class="left-video-div"></div>
        <div class="left-video-div"></div>
        <div class="video-title-div">
          <span>场端视角跟踪视频</span>
        </div>
        <div class="video-title-div">
          <span>车位视角跟踪视频</span>
        </div>
      </div>
      <div class="left-bot-div">
        <div class="small-frame">
          <span >车辆编号</span>
         <img width="30px" style="margin-right:5px;" src="../assets/car-info/square.png"> <span >A232</span>
        </div>
        <div class="small-frame">
          <span>驾驶模式</span>
          <span >自动驾驶</span>
        </div>
        <div class="small-frame">
          <span>操作状态</span>
          <img width="30px" style="margin-right:10px " src="../assets/car-info/link.png"><span >取车完成</span>
        </div>
        <div class="small-frame">
          <span>分配车位</span>
          <span >A02</span>
        </div>
        <div class="small-frame">
          <span>速度km/h</span>
          <span >62</span>
        </div>
        <div class="small-frame">
          <span>航向</span>
          <span >西南</span>
        </div>
        <div class="small-frame">
          <span>充电器状态</span>
          <span >末充电</span>
        </div>
        <div class="small-frame">
          <span>电量</span>
          <span >60%</span>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div class="right-video-div"></div>
      <span>驾驶视角跟踪视频</span>
      <div style="margin-top:25px" class="right-video-div"></div>
      <span>矢量地图位置跟踪显示</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    };
  },
  methods: {
    add() {
      this.num++;
      // console.log(this.$store.state.b)
    }
  }
};
</script>


<style scoped>
.blue {
  color: #00bfff;
}
.app::-webkit-scrollbar {
  display: none;
}

.app {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../assets/parkdetails/bg.png") no-repeat;
  background-size: 100% 100%;
  overflow: scroll;
  font-family: 微软雅黑;
  min-width: 1200px;
}

.left-container {
  /* border: solid #ccc 1px; */
  float: left;
  width: 70%;
  height: 862px;
}

.left-top-div {
  /* border: solid rgb(221, 75, 75) 2px; */
  height: 500px;
}

.left-top-div header {
  text-align: center;
  font-size: 25px;
  margin: 5px 0 15px 0;
}
.left-video-div {
  width: 48.6%;
  height: 390px;
  border: solid deepskyblue 1px;
  float: left;
  margin-left: 1%;
}

.video-title-div {
  /* border: solid deepskyblue 1px; */
  color: deepskyblue;
  width: 49%;
  height: 40px;
  float: left;
  text-align: center;
  margin-left: 1%;
  padding-top: 5px;
  font-size: 15pt;
}

.left-bot-div {
  height: 360px;
  /* border: solid rgb(115, 77, 221) 2px; */
  padding-left: 1%;
}

.small-frame {
  /* border: solid rgb(115, 77, 221) 2px; */
  background-image: url("../assets/car-info/small-frame.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 166px;
  width: 24.2%;
  margin-right: 0.8%;
  margin-bottom: 8px;
  float: left;
  padding: 22px;
}

.small-frame span:first-child{
    color: #0be2ed;
  font-size: 15pt;
  display: block;
  margin-bottom: 40px;
}

.small-frame span:nth-child(2){
    color: white;
  font-size: 18pt;
  display: inline-block;
  margin-top:2px;
}

.small-frame span:nth-child(3){
    color: white;
  font-size: 18pt;
  display: inline-block;
}

.right-container {
  /* border: solid rgba(50, 201, 70, 0.699) 1px; */
  float: left;
  width: 30%;
  height: 862px;
  text-align: center;
  padding: 0.5%;
}

.right-container span {
  font-size: 15pt;
  color: deepskyblue;
}

.right-video-div {
  border: solid deepskyblue 1px;
  width: 100%;
  height: 370px;
  margin-top: 10px;
  margin-bottom: 5px;
}
</style>
