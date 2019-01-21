<template>
  <div class="park">
    <div class="park-btn">
      <!-- <el-button type="primary" size="medium" @click="addParkDialog">添加停车场</el-button> -->
    </div>
    <div class="park-table">
      <el-table
        :data="wristData"
        border
        style="width: 100%">
        <el-table-column prop="sn" label="设备编号"></el-table-column>
        <el-table-column prop="gps_card" label="gps手机卡号"></el-table-column>
        <el-table-column prop="speed" label="关联用户信息">
          <template slot-scope="scope" v-if="scope.row.user[0]">{{scope.row.user[0].name}}</template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="updateWristDialog(scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="设置设备信息"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="wristEntity" label-width="80px">
        <el-form-item label="gps手机卡号">
          <el-input v-model="wristEntity.gps_card"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateWrist">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: 'Park',
  data () {
    return {
      wristData:[],
      wristEntity:{
        gps_card:null
      },
      isUpdateShow:false,
    }
  },
  created(){
    this.getWristList()
  },

  methods:{
    getWristList(_id){
      this.$global.httpGetWithToken(this,'user/allWristConfig').then(res=>{
        console.log(res)

          this.wristData = res.data
      })
    },
    updateWristDialog(item){
      this.wristEntity = item
      this.isUpdateShow = !this.isUpdateShow
    },
    updateWrist(){
      this.$global.httpPostWithToken(this,'user/operateWrist',{action:1,data:{_id:this.wristEntity._id,gps_card:this.wristEntity.gps_card}}).then(res=>{
        this.isUpdateShow = !this.isUpdateShow
        this.getWristList()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.park{
  height: 100%;
}
.park-btn {
  margin: 10px;
}
.park-red {
  background-color: red;
  color:white;
  padding:5px;
}
.park-green{
  background-color: green;
  color: white;
  padding:5px;
}
</style>
