<template>
  <div class="park">
    <div class="park-btn">
      <el-button type="primary" size="medium" @click="updateCanDialog()">添加垃圾桶</el-button>
    </div>
    <div class="park-table">
      <el-table
        :data="canData"
        border
        style="width: 100%">
        <el-table-column prop="sn" label="设备编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="number" label="编号"></el-table-column>
        <el-table-column label="负责人">
          <template slot-scope="scope" >{{scope.row.user?scope.row.user.realName+','+scope.row.user.phone:''}}</template>
        </el-table-column>
        <el-table-column label="经纬度">
          <template slot-scope="scope" >{{scope.row.lng}},{{scope.row.lat}}</template>
        </el-table-column>
        <el-table-column prop="place" label="位置"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="install_time" label="注册时间"></el-table-column>
        <el-table-column prop="intro" label="说明"></el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="updateCanDialog(scope.row)">设置垃圾桶</el-button>
            <el-button type="text" size="mini" @click="deleteCanDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="设置垃圾桶信息"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="canEntity" label-width="80px">
        <el-form-item label="设备编号">
          <el-input v-model="canEntity.sn"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="canEntity.name"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="canEntity.number"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="canEntity.user" placeholder="">
            <el-option label="无" :value="null"></el-option>
            <el-option v-for="item in userList" :label="item.realName" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="canEntity.lng"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="canEntity.lat"></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="canEntity.place"></el-input>
        </el-form-item>
        <el-form-item label="安装日期">
          <el-input v-model="canEntity.install_time"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="canEntity.intro"></el-input>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateCan">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除车辆"
      :visible.sync="isDeleteShow"
      width="50%">
      <span>确定要删除车辆么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteCan">确 定</el-button>
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
      canData:[],
      canEntity:{
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
        this.getCanList()
      })
    },
    getCanList(){
      this.$global.httpGetWithToken(this,'can/all').then(res=>{
        this.canData = res.data
      })
    },
    updateCanDialog(item){
      if(item){
        this.canEntity = item
      }else {
        this.canEntity._id = null
      }
      this.isUpdateShow = !this.isUpdateShow
    },
    updateCan(){
      var data = {action:this.canEntity._id?1:0,data:this.canEntity}
      this.$global.httpPostWithToken(this,'can/operate',data).then(res=>{
        this.isUpdateShow = !this.isUpdateShow
        this.getCanList()
      })
    },
    deleteCanDialog(item){
      this.isDeleteShow = !this.isDeleteShow
      this.canEntity = item
    },
    deleteCan(){
      this.$global.httpPostWithToken(this,'can/operate',{action:2,data:this.canEntity}).then(res=>{
        this.isDeleteShow = !this.isDeleteShow
        this.getCanList()
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
