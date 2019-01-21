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
        <el-table-column prop="boss" label="部门负责人"></el-table-column>
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
            <!-- <el-option v-for="item in $global.ENUM.CAR" :label="item" :value="item"></el-option> -->
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

  </div>
</template>

<script>

export default {
  name: 'Park',
  data () {
    return {
      departmentData:[],
      departmentEntity:{
        name:null,
        place:null,
        intro:null,
        boss:null,
      },
      isUpdateShow:false,
    }
  },
  created(){
    this.getDepartmentList()
  },

  methods:{
    getDepartmentList(){
      this.$global.httpGetWithToken(this,'department/all').then(res=>{
        console.log(res)
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
