<template>
  <div class="park">
    <div class="park-btn">
      <el-button type="primary" size="medium" @click="updateDepartmentDialog()">添加部门</el-button>
    </div>
    <div class="park-table">
      <el-table
        :data="departmentData"
        border
        style="width: 100%">
        <el-table-column prop="name" label="部门名称"></el-table-column>
        <el-table-column prop="place" label="部门位置"></el-table-column>
        <el-table-column label="部门负责人">
          <template slot-scope="scope">{{scope.row.boss?scope.row.boss.realName+','+scope.row.boss.phone:''}}</template>
        </el-table-column>
        <el-table-column prop="intro" label="备注"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="updateDepartmentDialog(scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="deleteDepartmentDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="设置部门信息"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="departmentEntity" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="departmentEntity.name"></el-input>
        </el-form-item>
        <el-form-item label="部门位置">
          <el-input v-model="departmentEntity.place"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="departmentEntity.boss" placeholder="">
            <el-option label="无" :value="null"></el-option>
            <el-option v-for="item in userList" :label="item.realName" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="departmentEntity.intro"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateDepartment">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除部门"
      :visible.sync="isDeleteShow"
      width="50%">
      <span>确定要删除部门么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteDepartment">确 定</el-button>
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
      departmentData:[],
      departmentEntity:{
        name:null,
        place:null,
        intro:null,
        boss:null,
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
          this.getDepartmentList()
      })
    },
    getDepartmentList(){
      this.$global.httpGetWithToken(this,'department/all').then(res=>{
        console.log(res.data)
          this.departmentData = res.data
      })
    },
    updateDepartmentDialog(item){
      if(item){
        this.departmentEntity = item
      }else {
        this.departmentEntity._id = null
      }
      this.isUpdateShow = !this.isUpdateShow
    },
    updateDepartment(){
      var data = {action:this.departmentEntity._id?1:0,data:this.departmentEntity}
      this.$global.httpPostWithToken(this,'department/operate',data).then(res=>{
        this.isUpdateShow = !this.isUpdateShow
        this.getDepartmentList()
      })
    },
    deleteDepartmentDialog(item){
      this.isDeleteShow = !this.isDeleteShow
      this.departmentEntity = item
    },
    deleteDepartment(){
      this.$global.httpPostWithToken(this,'department/operate',{action:2,data:this.departmentEntity}).then(res=>{
        this.isDeleteShow = !this.isDeleteShow
        this.getDepartmentList()
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
