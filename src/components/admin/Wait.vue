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
              <el-col :span="4">
                <el-button size="mini" type="primary" @click="addWaitDialog(area)">添加取车点</el-button>
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
                <el-button type="text" size="mini" @click="updateWaitDialog(scope.row)">修改</el-button>
                <el-button type="text" size="mini" @click="deleteWaitDialog(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </template>
    </div>
    <el-dialog
      title="添加取车点"
      :visible.sync="isAddShow"
      width="70%">
      <el-form ref="form" :model="waitEntity" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="waitEntity.number"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="waitEntity.name"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-select v-model="waitEntity.isEnable" placeholder="">
            <el-option label="可用" :value="0"></el-option>
            <el-option label="不可用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input v-model="waitEntity.lat"></el-input>
          <el-input v-model="waitEntity.lng"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddShow = false">取 消</el-button>
        <el-button type="primary" @click="addWait">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改取车点"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="waitEntity" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="waitEntity.number"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="waitEntity.name"></el-input>
        </el-form-item>

        <el-form-item label="经纬度">
          <el-input v-model="waitEntity.lat"></el-input>
          <el-input v-model="waitEntity.lng"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateWait">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除取车点"
      :visible.sync="isDeleteShow"
      width="50%">
      <span>确定要删除取车点么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteWait">确 定</el-button>
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
      areaEntity:null,
      waitEntity:{
        isEnable:null,
        lat:null,
        lng:null,
        name:null,
        number:null,
      },
      isAddShow:false,
      isUpdateShow:false,
      isDeleteShow:false
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
    updateWaitDialog(item){
      this.isUpdateShow = !this.isUpdateShow
      this.waitEntity = item
    },
    deleteWaitDialog(item){
      this.isDeleteShow = !this.isDeleteShow
      this.waitEntity = item
    },
    addWaitDialog(area){
      this.isAddShow = !this.isAddShow
      this.areaEntity = area
    },
    addWait(){
      this.$global.httpPostWithToken(this,'wait/add/'+this.areaEntity._id,this.waitEntity).then(res=>{
        this.isAddShow = !this.isAddShow
        this.getWaitList()
      })
    },
    updateWait(){
      this.$global.httpPostWithToken(this,'wait/update/'+this.waitEntity._id,this.waitEntity).then(res=>{
        this.isUpdateShow = !this.isUpdateShow
        this.getWaitList()
      })
    },
    deleteWait(){
      this.$global.httpGetWithToken(this,'wait/delete/'+this.waitEntity._id).then(res=>{
        this.isDeleteShow = !this.isDeleteShow
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
</style>
