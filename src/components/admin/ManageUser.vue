<template>
  <div class="park">
    <div class="park-btn">
      <el-button type="primary" size="medium" @click="updateUserDialog()">添加用户</el-button>
    </div>
    <div class="park-table">
      <el-table
        :data="userData"
        border
        style="width: 100%">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="realname" label="真实姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="id_card" label="身份证号"></el-table-column>
        <el-table-column prop="title" label="职务"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="boss" label="负责人"></el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column prop="place" label="地点"></el-table-column>
        <el-table-column prop="sn_card" label="电子工牌编号"></el-table-column>
        <el-table-column prop="sn_wrist" label="手环编号"></el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="updateUserDialog(scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="deleteUserDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="设置用户信息"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="userEntity" label-width="80px">
        <el-form-item label="用户名"><el-input v-model="userEntity.username"></el-input></el-form-item>
        <el-form-item label="密码"><el-input v-model="userEntity.password"></el-input></el-form-item>
        <el-form-item label="真实姓名"><el-input v-model="userEntity.realname"></el-input></el-form-item>
        <el-form-item label="手机号"><el-input v-model="userEntity.phone"></el-input></el-form-item>
        <el-form-item label="身份证号"><el-input v-model="userEntity.id_card"></el-input></el-form-item>
        <el-form-item label="职务"><el-input v-model="userEntity.title"></el-input></el-form-item>
        <el-form-item label="类型">
          <el-select v-model="userEntity.type" placeholder="">
            <el-option v-for="(item,index) in $global.ENUM.USER_TYPE" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="userEntity.boss" placeholder="">
            <el-option v-for="item in userData" :label="item.realname" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="userEntity.department" placeholder="">
            <el-option v-for="item in departmentData" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地点"><el-input v-model="userEntity.place"></el-input></el-form-item>
        <el-form-item label="电子工牌编号"><el-input v-model="userEntity.sn_card"></el-input></el-form-item>
        <el-form-item label="手环编号"><el-input v-model="userEntity.sn_wrist"></el-input></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除用户"
      :visible.sync="isDeleteShow"
      width="50%">
      <span>确定要删除用户么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Park',
  data () {
    return {
      userData:[],
      departmentData:[],
      userEntity:{
        username:null,
        password:null,
        realname:null,
        id_card:null,
        phone:null,
        title:null,
        type:null,
        boss:null,
        department:null,
        place:null,
        sn_card:null,
        sn_app:null,
        sn_wrist:null
      },
      isUpdateShow:false,
      isDeleteShow:false,
    }
  },
  async created(){
    await this.getDepartmentList()
    this.getUserList()
  },
  methods:{
    async getDepartmentList(){
      const res = await this.$global.httpGetWithToken(this,'department/all')
      this.departmentData = res.data
    },
    getUserList(){
      this.$global.httpGetWithToken(this,'user/all').then(res=>{
          this.userData = res.data
      })
    },
    updateUserDialog(item){
      if(item){
        this.userEntity = item
      }else {
        this.userEntity._id = null
      }
      this.isUpdateShow = !this.isUpdateShow
    },
    updateUser(){
      var data = {action:this.userEntity._id?1:0,data:this.userEntity}
      this.$global.httpPostWithToken(this,'user/operate',data).then(res=>{
        this.isUpdateShow = !this.isUpdateShow
        this.getUserList()
      })
    },
    deleteUserDialog(item){
      this.isDeleteShow = !this.isDeleteShow
      this.userEntity = item
    },
    deleteUser(){
      this.$global.httpPostWithToken(this,'user/operate',{action:2,data:this.userEntity}).then(res=>{
        this.isDeleteShow = !this.isDeleteShow
        this.getUserList()
      })
    },
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
