<template>
  <div class="park">
    <div class="park-btn">
      <el-button type="primary" size="medium" @click="updateCarDialog()">添加车辆</el-button>
    </div>
    <div class="park-table">
      <el-table
        :data="carData"
        border
        style="width: 100%">
        <el-table-column prop="name" label="车牌"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.state == 1 ? '使用':'未使用'}}</template>
        </el-table-column>
        <el-table-column prop="sn" label="设备编号"></el-table-column>
        <el-table-column label="驾驶员">
          <template slot-scope="scope" >{{scope.row.user?scope.row.user.name:''}}</template>
        </el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="brand" label="品牌"></el-table-column>
        <el-table-column prop="type_weight" label="吨位"></el-table-column>
        <el-table-column prop="place" label="位置"></el-table-column>
        <el-table-column label="是否有保险">
          <template slot-scope="scope">{{scope.row.has_insurance ? '是':'否'}}</template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="install_time" label="注册时间"></el-table-column>
        <el-table-column prop="intro" label="说明"></el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="updateCarDialog(scope.row)">设置车辆</el-button>
            <el-button type="text" size="mini" @click="deleteCarDialog(scope.row)">删除</el-button>
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
        <el-form-item label="状态">
          <el-select v-model="carEntity.state" placeholder="">
            <el-option label="使用" :value=1 ></el-option>
            <el-option label="未使用" :value=0 ></el-option>
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
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="carEntity.intro"></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="carEntity.place"></el-input>
        </el-form-item>
        <el-form-item label="驾驶员">
          <el-select v-model="carEntity.user" placeholder="">
            <el-option label="无" :value="null"></el-option>
            <el-option v-for="item in userList" :label="item.realName" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateCar">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除车辆"
      :visible.sync="isDeleteShow"
      width="50%">
      <span>确定要删除车辆么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteCar">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Park',
  data () {
    return {
      userList:[],
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
      isDeleteShow:false,
    }
  },
  created(){
    this.getUserList()
  },

  methods:{
    getUserList(){
      this.$global.httpGetWithToken(this,'user/all').then(res=>{
        this.userList = res.data
        this.getCarList()
      })
    },
    getCarList(){
      this.$global.httpGetWithToken(this,'car/all').then(res=>{
        this.carData = res.data
      })
    },
    updateCarDialog(item){
      if(item){
        this.carEntity = item
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
    },
    deleteCarDialog(item){
      this.isDeleteShow = !this.isDeleteShow
      this.carEntity = item
    },
    deleteCar(){
      this.$global.httpPostWithToken(this,'car/operate',{action:2,data:this.carEntity}).then(res=>{
        this.isDeleteShow = !this.isDeleteShow
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
