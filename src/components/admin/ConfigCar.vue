<template>
  <div class="park">
    <div class="park-btn">
      <!-- <el-button type="primary" size="medium" @click="addParkDialog">添加停车场</el-button> -->
    </div>
    <div class="park-table">
      <el-table
        :data="carData"
        border
        style="width: 100%">
        <el-table-column prop="sn" label="设备编号"></el-table-column>
        <el-table-column prop="gps_card" label="gps手机卡号"></el-table-column>
        <el-table-column prop="speed" label="关联车辆信息">
          <template slot-scope="scope" v-if="scope.row.car[0]">{{scope.row.car[0].name}}</template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="updateCarDialog(scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="设置设备信息"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="carEntity" label-width="80px">
        <el-form-item label="gps手机卡号">
          <el-input v-model="carEntity.gps_card"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateCar">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: 'Park',
  data () {
    return {
      carData:[],
      carEntity:{
        gps_card:null
      },
      isUpdateShow:false,
    }
  },
  created(){
    this.getCarList()
  },

  methods:{
    getCarList(_id){
      this.$global.httpGetWithToken(this,'car/allOfConfig').then(res=>{
        console.log(res)

          this.carData = res.data
      })
    },
    updateCarDialog(item){
      this.carEntity = item
      this.isUpdateShow = !this.isUpdateShow
    },
    updateCar(){
      this.$global.httpPostWithToken(this,'car/operateDevice',{action:1,data:{_id:this.carEntity._id,gps_card:this.carEntity.gps_card}}).then(res=>{
        this.isUpdateShow = !this.isUpdateShow
        this.getCarList()
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
