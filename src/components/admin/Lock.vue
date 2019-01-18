<template>
  <div class="lot">
    <div class="lot-table">
      <template v-for="park in lotData">
        <template v-for="area in park.area">
          <div class="lot-title">
            <el-row>
              <el-col :span="20">
                <div><span style="color:#303133;font-siez:14px;font-weight:bold">{{park.name}} 编号:{{park.number}} &nbsp;&nbsp;&nbsp;&nbsp;</span><el-tag>{{area.name}} 编号:{{area.number}}</el-tag></div>
              </el-col>
              <el-col :span="4">
                <el-button size="mini" type="primary" @click="addLotDialog(area)">添加停车位</el-button>
              </el-col>
            </el-row>
          </div>
          <el-table :data="area.lot" border style="width: 100%" size=mini>
            <el-table-column prop="number" label="编号"></el-table-column>
            <el-table-column label="是否可用">
              <template slot-scope="scope">
                  <el-tag size="mini" type="success" v-if="scope.row.isEnable == 0">平台</el-tag>
                  <el-tag size="mini" type="danger" v-else>平台</el-tag>
                  <el-tag size="mini" type="success" v-if="scope.row.isThirdEnable == 0">第三方</el-tag>
                  <el-tag size="mini" type="danger" v-else>第三方</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="坐标">
              <template slot-scope="scope">
                <span>{{scope.row.coordinate_x}},{{scope.row.coordinate_y}},{{scope.row.coordinate_z}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="车位类型">
              <template slot-scope="scope">
                <span v-if="scope.row.garageType == 0">无</span>
                <span v-if="scope.row.garageType == 1">地锁</span>
                <span v-if="scope.row.garageType == 2">充电桩</span>
              </template>
            </el-table-column>
            <el-table-column  label="地锁信息" width="250">
              <template slot-scope="scope">
                <span v-if="scope.row.lock">{{scope.row.lock.brand}}-{{scope.row.lock.gateway}}:{{scope.row.lock.serial}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="updateLockDialog(scope.row)">配置地锁</el-button>
                <el-button type="text" size="mini" @click="deleteLockDialog(scope.row)">清除地锁</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </template>
    </div>
    <el-dialog
      title="配置地磁"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="lockEntity" label-width="80px">
        <el-form-item label="地锁品牌">
          <el-select v-model="lockEntity.brand" placeholder="请选择品牌">
            <el-option label="越德地锁" value="越德地锁"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网关">
          <el-input v-model="lockEntity.gateway"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="lockEntity.serial"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateLock">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="清除地锁"
      :visible.sync="isDeleteShow"
      width="50%">
      <span>确定要清除地磁么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteLock">确 定</el-button>
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
      lotData:[],
      lotEntity:null,
      lockEntity:{
        brand:null,
        gateway:null,
        serial:null,
      },
      isUpdateShow:false,
      isDeleteShow:false
    }
  },
  created(){
    this.getLotList()
  },

  methods:{
    getLotList(){
      this.$global.httpGetWithToken(this,'park/all').then(res=>{
        this.lotData = res.data
        console.log(this.lotData)
      })
    },
    updateLockDialog(item){
      this.isUpdateShow = !this.isUpdateShow
      this.lotEntity = item
      if(item.lock){
        this.lockEntity = item.lock
      }else {
        this.lockEntity = {
          brand:null,
          gateway:null,
          serial:null,
        }
      }
    },
    updateLock(){
      console.log(this.lockEntity)
      if(this.lockEntity._id){
        this.$global.httpPostWithToken(this,'lock/update/'+this.lockEntity._id,this.lockEntity).then(res=>{
          this.isUpdateShow = !this.isUpdateShow
          this.getLotList()
        })
      }else {
        this.$global.httpPostWithToken(this,'lock/add/'+this.lotEntity._id,this.lockEntity).then(res=>{
          this.isUpdateShow = !this.isUpdateShow
          this.getLotList()
        })
      }
    },
    deleteLockDialog(item){
      this.isDeleteShow = !this.isDeleteShow
      this.lockEntity = item.lock
    },
    deleteLock(){
      this.$global.httpGetWithToken(this,'lock/delete/'+this.lockEntity._id).then(res=>{
        this.isDeleteShow = !this.isDeleteShow
        this.getLotList()
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
