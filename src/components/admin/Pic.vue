<template>
  <div class="lot">
    <div class="lot-table">
      <div class="park-btn">
        <!-- <el-button type="primary" size="medium" @click="addParkDialog">添加停车场</el-button> -->
      </div>
      <div class="park-table">
            <template v-for="item in fileData">
              <template v-for="item2 in JSON.parse(item.data)">
                <div style="display:inline-block;width:300px" v-if="item.plateNumber">
                  <img :src="item2.src+'?imageView2/2/w/300/h/300'">
                  {{item.create_time}}
                </div>
                <div style="display:inline-block;width:300px" v-else>
                  <video  width="300px" height="150px"  style="width: 100%;height: 100%" autoplay="autoplay" >
                      <source type="video/mp4"  src="http://pjczt3pug.bkt.clouddn.com/20181205_152626.mp4" >
                  </video>
                  <!-- <video src="http://pjczt3pug.bkt.clouddn.com/20181205_152626.mp4" controls="controls">
                  您的浏览器不支持 video 标签。
                  </video> -->
                  {{item.create_time}}
                </div>
              </template>
            </template>
      </div>
    </div>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap';


export default {
  name: 'Lot',
  data () {
    return {
      fileData:null,
    }
  },
  created(){
    this.getFileList()
  },

  methods:{
    getFileList(){
      this.$global.httpGetWithToken(this,'order/file').then(res=>{
        this.fileData = res.data
      })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  height: 100%;
}
.amap-wrapper {
  width: 100%;
  height:100%;
}
.lot-title {
  margin: 10px;
  font-size: 16px;
}
.lot-table {
  margin-bottom: 20px;
}
</style>
