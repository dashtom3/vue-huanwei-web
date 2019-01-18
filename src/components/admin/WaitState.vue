<template>
  <div class="wait">
    <div class="lot-table">
      <template v-for="park in waitData">
        <template v-for="area in park.area">
          <div class="lot-title">
            <el-row>
              <el-col :span="20">
                <div><span style="color:#303133;font-siez:14px;font-weight:bold">{{park.name}} 编号:{{park.number}} &nbsp;&nbsp;&nbsp;&nbsp;</span><el-tag>{{area.name}} 编号:{{area.number}}</el-tag></div>
              </el-col>
            </el-row>
          </div>
          <el-table :data="area.wait" border style="width: 100%" size=mini>
            <el-table-column prop="number" label="编号"></el-table-column>
            <el-table-column prop="name" label="名称" width="300"></el-table-column>
            <el-table-column label="是否可用">
              <template slot-scope="scope">
                  <el-tag size="mini" type="success" v-if="scope.row.isEnable == 0">可用</el-tag>
                  <el-tag size="mini" type="danger" v-else>不可用</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="坐标">
              <template slot-scope="scope">
                <span>{{scope.row.lat}},{{scope.row.lng}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="setState(scope.row,1,park)" v-if="scope.row.isEnable == 0">设置不可用</el-button>
                <el-button type="text" size="mini" @click="setState(scope.row,0,park)" v-if="scope.row.isEnable == 1">设置可用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </template>
    </div>

    <el-dialog
      title="设置取车点"
      :visible.sync="isSetShow"
      width="50%">
      <span class="wait-dia-tit">博览公园取车点状态改变会推送上汽云，确定要更改取车点状态么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isSetShow = false">取 消</el-button>
        <el-button type="primary" @click="setFinalState">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap';


export default {
  name: 'Lock',
  data () {
    return {
      waitData:[],
      waitEntity:null,
      state:null,
      isSetShow:false
    }
  },
  created(){
    this.getWaitList()
  },

  methods:{
    getWaitList(){
      this.$global.httpGetWithToken(this,'park/all').then(res=>{
        this.waitData = res.data
      })
    },
    setState(wait,state,park){
      this.waitEntity = wait
      this.state = state
      if(park.name == '博览公园停车场'){
        this.isSetShow = !this.isSetShow
      }else {
        this.setFinalState()
      }
    },
    setFinalState(){
      this.$global.httpGetWithToken(this,'wait/state/'+this.waitEntity._id,{isEnable:this.state}).then(res=>{
        this.isSetShow = false
        this.getWaitList()
      })
    }
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
.wait-dia-tit {
  color:red;
  font-weight: bold;
}
</style>
