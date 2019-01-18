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
            <el-table-column prop="number" label="状态">
              <template slot-scope="scope">
                <el-tag size="mini" type="danger" v-if="scope.row.status == 0">占用</el-tag>
                <el-tag size="mini" type="warning" v-if="scope.row.status == 1">预约</el-tag>
                <el-tag size="mini" type="success" v-if="scope.row.status == 2">空闲</el-tag>
              </template>
            </el-table-column>
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
            <el-table-column label="自动泊车">
              <template slot-scope="scope">
                <el-tag size="mini"type="success" v-if="scope.row.isAuto == true">支持</el-tag>
                <el-tag size="mini" type="danger" v-if="scope.row.isAuto == false">不支持</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="能否充电">
              <template slot-scope="scope">
                <el-tag size="mini" type="success" v-if="scope.row.isChargingAvailable == true">能</el-tag>
                <el-tag size="mini" type="danger" v-if="scope.row.isChargingAvailable == false">不能</el-tag>
              </template>
            </el-table-column>
            <el-table-column  label="车位类型">
              <template slot-scope="scope">
                <span v-if="scope.row.garageType == 0">无</span>
                <span v-if="scope.row.garageType == 1">地锁</span>
                <span v-if="scope.row.garageType == 2">充电桩</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="操作" width="250">
              <template slot-scope="scope">
                <!-- <el-button type="text" size="mini" v-if="scope.row.isEnable==0" @click=changeState(scope.row,0)>关闭平台</el-button>
                <el-button type="text" size="mini" v-else @click=changeState(scope.row,0)>开启平台</el-button>
                <el-button type="text" size="mini" v-if="scope.row.isThirdEnable ==0" @click=changeState(scope.row,1)>关闭第三方</el-button>
                <el-button type="text" size="mini" v-else @click=changeState(scope.row,1)>开启第三方</el-button> -->
                <el-button type="text" size="mini" @click="updateLotDialog(scope.row)">修改</el-button>
                <el-button type="text" size="mini" @click="deleteLotDialog(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </template>
    </div>
    <el-dialog
      title="添加停车位"
      :visible.sync="isAddShow"
      width="70%">
      <el-form ref="form" :model="lotEntity" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="lotEntity.number"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="lotEntity.status" placeholder="">
            <el-option label="占用" :value="0"></el-option>
            <el-option label="预约" :value="1"></el-option>
            <el-option label="空闲" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-select v-model="lotEntity.isEnable" placeholder="">
            <el-option label="可用" :value="0"></el-option>
            <el-option label="不可用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第三方可用">
          <el-select v-model="lotEntity.isThirdEnable" placeholder="">
            <el-option label="可用" :value="0"></el-option>
            <el-option label="不可用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input v-model="lotEntity.coordinate_x"></el-input>
          <el-input v-model="lotEntity.coordinate_y"></el-input>
          <el-input v-model="lotEntity.coordinate_z"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="lotEntity.garageType" placeholder="请选择类型">
            <el-option label="无" :value="0"></el-option>
            <el-option label="地锁" :value="1"></el-option>
            <el-option label="充电桩" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自动泊车">
          <el-select v-model="lotEntity.isAuto" placeholder="">
            <el-option label="支持" :value=true></el-option>
            <el-option label="不支持" :value=false></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能否充电">
          <el-select v-model="lotEntity.isChargingAvailable" placeholder="">
            <el-option label="能" :value=true></el-option>
            <el-option label="不能" :value=false></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddShow = false">取 消</el-button>
        <el-button type="primary" @click="addLot">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改停车位"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="lotEntity" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="lotEntity.number"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select v-model="lotEntity.status" placeholder="">
            <el-option label="占用" :value="0"></el-option>
            <el-option label="预约" :value="1"></el-option>
            <el-option label="空闲" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-select v-model="lotEntity.isEnable" placeholder="">
            <el-option label="可用" :value="0"></el-option>
            <el-option label="不可用" :value="1"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="经纬度">
          <el-input v-model="lotEntity.coordinate_x"></el-input>
          <el-input v-model="lotEntity.coordinate_y"></el-input>
          <el-input v-model="lotEntity.coordinate_z"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="lotEntity.garageType" placeholder="请选择类型">
            <el-option label="无" :value="0"></el-option>
            <el-option label="地锁" :value="1"></el-option>
            <el-option label="充电桩" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自动泊车">
          <el-select v-model="lotEntity.isAuto" placeholder="">
            <el-option label="支持" :value=true></el-option>
            <el-option label="不支持" :value=false></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能否充电">
          <el-select v-model="lotEntity.isChargingAvailable" placeholder="">
            <el-option label="能" :value=true></el-option>
            <el-option label="不能" :value=false></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateLot">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除停车场"
      :visible.sync="isDeleteShow"
      width="50%">
      <span>确定要删除停车场么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteLot">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap';


export default {
  name: 'Lot',
  data () {
    return {
      lotData:[],
      areaEntity:null,
      lotEntity:{
        number:'',
        status:2,
        isEnable:0,
        isThirdEnable:0,
        isAuto:false,
        isChargingAvailable:false,
        garageType:0,
        coordinate_x:0,
        coordinate_y:0,
        coordinate_z:0
      },
      isAddShow:false,
      isUpdateShow:false,
      isDeleteShow:false,
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
    addLotDialog(item){
      this.areaEntity = item
      this.isAddShow = !this.isAddShow
    },
    addLot(){
      this.$global.httpPostWithToken(this,'lot/add/'+this.areaEntity._id,this.lotEntity).then(res=>{
        this.isAddShow = !this.isAddShow
        this.getLotList()
      })
    },
    updateLotDialog(item){
      this.lotEntity = item
      this.isUpdateShow = !this.isUpdateShow
    },
    updateLot(){
      this.$global.httpPostWithToken(this,'lot/update/'+this.lotEntity._id,this.lotEntity).then(res=>{
        this.isUpdateShow = !this.isUpdateShow
        this.getLotList()
      })
    },
    deleteLotDialog(item){
      this.isDeleteShow = !this.isDeleteShow
      this.lotEntity = item
    },
    deleteLot(){
      this.$global.httpGetWithToken(this,'lot/delete/'+this.lotEntity._id).then(res=>{
        this.isDeleteShow = !this.isDeleteShow
        this.getLotList()
      })
    },
    changeState(item,val){
      if(val == 0){
        this.$global.httpGetWithToken(this,'lot/state/'+item._id,{isEnable:item.isEnable == 0?1:0}).then(res=>{
          this.getLotList()
        })
      }else {
        this.$global.httpGetWithToken(this,'lot/state/'+item._id,{isThirdEnable:item.isThirdEnable == 0?1:0}).then(res=>{
          this.getLotList()
        })
      }
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
