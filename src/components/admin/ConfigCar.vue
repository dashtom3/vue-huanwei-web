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
        <el-table-column prop="speed" label="车牌">
          <template slot-scope="scope" v-if="scope.row.car[0]">{{scope.row.car[0].name}}</template>
        </el-table-column>
        <el-table-column prop="speed" label="驾驶员">
          <template slot-scope="scope" v-if="scope.row.car[0]">{{scope.row.car[0].user}}</template>
        </el-table-column>
        <el-table-column prop="speed" label="状态">
          <template slot-scope="scope" v-if="scope.row.car[0]">
            <span v-if="scope.row.car[0].type == 0">未使用</span>
            <span v-if="scope.row.car[0].type == 1">使用</span>
          </template>
        </el-table-column>
        <el-table-column prop="speed" label="类型">
          <template slot-scope="scope" v-if="scope.row.car[0]">{{scope.row.car[0].type}}</template>
        </el-table-column>
        <el-table-column prop="speed" label="品牌">
          <template slot-scope="scope" v-if="scope.row.car[0]">{{scope.row.car[0].brand}}</template>
        </el-table-column>
        <el-table-column prop="speed" label="吨位">
          <template slot-scope="scope" v-if="scope.row.car[0]">{{scope.row.car[0].type_weight}}</template>
        </el-table-column>
        <el-table-column prop="speed" label="是否有保险">
          <template slot-scope="scope" v-if="scope.row.car[0]">{{scope.row.car[0].has_insurance}}</template>
        </el-table-column>
        <el-table-column prop="speed" label="系统时间">
          <template slot-scope="scope" v-if="scope.row.car[0]">{{scope.row.car[0].create_time}}</template>
        </el-table-column>
        <el-table-column prop="speed" label="注册时间">
          <template slot-scope="scope" v-if="scope.row.car[0]">{{scope.row.car[0].install_time}}</template>
        </el-table-column>
        <el-table-column prop="speed" label="说明">
          <template slot-scope="scope" v-if="scope.row.car[0]">{{scope.row.car[0].intro}}</template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="updateCarDialog(scope.row)">设置车辆</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="设置车辆信息"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="carEntity" label-width="80px">
        <el-form-item label="车牌号">
          <el-input v-model="carEntity.name"></el-input>
        </el-form-item>
        <el-form-item label="gps手机号">
          <el-input v-model="carEntity.phone"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="carEntity.state" placeholder="">
            <el-option label="使用" value="0"></el-option>
            <el-option label="未使用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="carEntity.type" placeholder="">
            <el-option v-for="item in $global.ENUM.CAR" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车重">
          <el-select v-model="carEntity.type_weight" placeholder="">
            <el-option v-for="item in $global.ENUM.CAR_WEIGHT" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="carEntity.brand"></el-input>
        </el-form-item>
        <el-form-item label="安装日期">
          <el-input v-model="carEntity.install_time"></el-input>
        </el-form-item>
        <el-form-item label="是否保险">
          <el-select v-model="carEntity.has_insurance" placeholder="">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="carEntity.intro"></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="carEntity.position"></el-input>
        </el-form-item>
        <el-form-item label="用户">
          <!-- <el-select v-model="parkEntity.garageType" placeholder="请选择类型">
            <el-option label="无" :value="0"></el-option>
            <el-option label="地锁" :value="1"></el-option>
            <el-option label="充电桩" :value="2"></el-option>
          </el-select> -->
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
        name:null,
        type:null,
        brand:null,
        type_weight:null,
        install_time:null,
        has_insurance:null,
        intro:null,
        sn:null,
        user:null,
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
      this.carEntity.sn = item.sn
      if(item.car[0]){
        this.carEntity = item.car[0]
      }else {
        this.carEntity._id = null
      }
      this.isUpdateShow = !this.isUpdateShow
    },
    updateCar(){
      var data = {action:this.carEntity._id?1:0,data:this.carEntity}
      this.$global.httpPostWithToken(this,'car/operate',data).then(res=>{
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
