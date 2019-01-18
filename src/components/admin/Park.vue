<template>
  <div class="park">
    <div class="park-btn">
      <el-button type="primary" size="medium" @click="addParkDialog">添加停车场</el-button>
    </div>
    <div class="park-table">
      <el-table
        :data="parkData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="number"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="carNumber"
          label="车位数">
        </el-table-column>
        <el-table-column
          prop="floor"
          label="片区数">
        </el-table-column>
        <el-table-column
          label="经纬度">
          <template slot-scope="scope">{{ scope.row.lat}},{{scope.row.lng}}</template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="等级">
        </el-table-column>
        <el-table-column
          label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.garageType == 0">无地锁等</span>
            <span v-if="scope.row.garageType == 1">地锁</span>
            <span v-if="scope.row.garageType == 2">充电桩</span>
            ;
            <span v-if="scope.row.payType == 0">收费</span>
            <span v-if="scope.row.payType == 1">免费</span>
            ;
            <span v-if="scope.row.isGateControl == true">有闸机</span>
            <span v-if="scope.row.isGateControl == false">无闸机</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 0">运行</el-tag>
            <el-tag type="danger" v-else class="park-red">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="allAreaDialog(scope.row)">查看片区</el-button>
            <el-button type="text" size="mini" v-if="scope.row.status == 0">关闭</el-button>
            <el-button type="text" size="mini" v-else>开启</el-button>
            <el-button type="text" size="mini" @click="updateParkDialog(scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="deleteParkDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="修改停车场"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="parkEntity" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="parkEntity.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="parkEntity.address"></el-input>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input v-model="parkEntity.lat"></el-input>
          <el-input v-model="parkEntity.lng"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="parkEntity.number"></el-input>
        </el-form-item>
        <el-form-item label="片区数目">
          <el-input v-model="parkEntity.floor"></el-input>
        </el-form-item>
        <el-form-item label="车位数">
          <el-input v-model="parkEntity.carNumber"></el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="parkEntity.level" placeholder="">
            <el-option label="1级" :value="1"></el-option>
            <el-option label="2级" :value="2"></el-option>
            <el-option label="3级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="parkEntity.status" placeholder="">
            <el-option label="运行" :value="0"></el-option>
            <el-option label="关闭" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="parkEntity.garageType" placeholder="请选择类型">
            <el-option label="无" :value="0"></el-option>
            <el-option label="地锁" :value="1"></el-option>
            <el-option label="充电桩" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否收费">
          <el-select v-model="parkEntity.payType" placeholder="">
            <el-option label="收费" :value="0"></el-option>
            <el-option label="免费" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有无闸机">
          <el-select v-model="parkEntity.isGateControl" placeholder="">
            <el-option label="是" :value=true></el-option>
            <el-option label="否" :value=false></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updatePark">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加停车场"
      :visible.sync="isAddShow"
      width="70%">
      <el-form ref="form" :model="parkEntity" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="parkEntity.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="parkEntity.address"></el-input>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input v-model="parkEntity.lat"></el-input>
          <el-input v-model="parkEntity.lng"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="parkEntity.number"></el-input>
        </el-form-item>
        <el-form-item label="片区数目">
          <el-input v-model="parkEntity.floor"></el-input>
        </el-form-item>
        <el-form-item label="车位数">
          <el-input v-model="parkEntity.carNumber"></el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="parkEntity.level" placeholder="">
            <el-option label="1级" :value="1"></el-option>
            <el-option label="2级" :value="2"></el-option>
            <el-option label="3级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="parkEntity.status" placeholder="">
            <el-option label="运行" :value="0"></el-option>
            <el-option label="关闭" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="parkEntity.garageType" placeholder="请选择类型">
            <el-option label="无" :value="0"></el-option>
            <el-option label="地锁" :value="1"></el-option>
            <el-option label="充电桩" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否收费">
          <el-select v-model="parkEntity.payType" placeholder="">
            <el-option label="收费" :value="0"></el-option>
            <el-option label="免费" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有无闸机">
          <el-select v-model="parkEntity.isGateControl" placeholder="">
            <el-option label="有" :value=true></el-option>
            <el-option label="无" :value=false></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddShow = false">取 消</el-button>
        <el-button type="primary" @click="addPark">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除停车场"
      :visible.sync="isDeleteShow"
      width="50%">
      <span>确定要删除停车场么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deletePark">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="停车片区"
      :visible.sync="isAreaShow"
      width="70%">

      <el-table
        :data="areaData"
        border
        style="width: 100%">
        <el-table-column
          label="名称"
          >
          <template slot-scope="scope">
            <template v-if="!scope.row.isEdit">
              <span>{{scope.row.name}}</span>
            </template>
            <template v-else>
              <el-input v-model="scope.row.name"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="编号"
          >
          <template slot-scope="scope">
            <template v-if="!scope.row.isEdit">
              <span>{{scope.row.number}}</span>
            </template>
            <template v-else>
              <el-input v-model="scope.row.number"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="片区层数"
          >
          <template slot-scope="scope">
            <template v-if="!scope.row.isEdit">
              <span>{{scope.row.lotType}}</span>
            </template>
            <template v-else>
              <el-input v-model="scope.row.lotType"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="车位数">
          <template slot-scope="scope">
            <template v-if="!scope.row.isEdit">
              <span>{{scope.row.carNumber}}</span>
            </template>
            <template v-else>
              <el-input v-model="scope.row.carNumber"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="类型">
          <template slot-scope="scope">
            <template v-if="!scope.row.isEdit">
              <span v-if="scope.row.garageType == 0">无地锁等</span>
              <span v-if="scope.row.garageType == 1">地锁</span>
              <span v-if="scope.row.garageType == 2">充电桩</span>
            </template>
            <template v-else>
              <el-select v-model="scope.row.garageType" placeholder="请选择类型">
                <el-option label="无" :value="0"></el-option>
                <el-option label="地锁" :value="1"></el-option>
                <el-option label="充电桩" :value="2"></el-option>
              </el-select>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="收费">
          <template slot-scope="scope">
            <template v-if="!scope.row.isEdit">
              <span v-if="scope.row.payType == 0">收费</span>
              <span v-if="scope.row.payType == 1">免费</span>
            </template>
            <template v-else>
              <el-select v-model="scope.row.payType" placeholder="">
                <el-option label="收费" :value="0"></el-option>
                <el-option label="免费" :value="1"></el-option>
              </el-select>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="闸机">
          <template slot-scope="scope">
            <template v-if="!scope.row.isEdit">
              <span v-if="scope.row.isGateControl == true">有</span>
              <span v-if="scope.row.isGateControl == false">无</span>
            </template>
            <template v-else>
              <el-select v-model="scope.row.isGateControl" placeholder="">
                <el-option label="有" :value=true></el-option>
                <el-option label="无" :value=false></el-option>
              </el-select>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 0">运行</el-tag>
            <el-tag type="danger" v-else class="park-red">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <template v-if="!scope.row.isEdit">
              <el-button type="text" size="mini" v-if="scope.row.status == 0">关闭</el-button>
              <el-button type="text" size="mini" v-else>开启</el-button>
              <el-button type="text" size="mini" @click="updateAreaDialog(scope.row)">修改</el-button>
              <el-button type="text" size="mini" @click="deleteAreaDialog(scope.row)">删除</el-button>
            </template>
            <template v-else>
              <el-button type="text" size="mini" @click="cancelArea(scope.row,scope.$index)">取消</el-button>
              <el-button type="text" size="mini" @click="updateArea(scope.row)">确定</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addArea">添加停车片区</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除停车片区"
      :visible.sync="isAreaDelete"
      width="50%">
      <span>确定要删除该停车片区么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAreaDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteArea">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Park',
  data () {
    return {
      parkData:[],
      parkEntity:{
        name:null,
        address:null,
        lat:null,
        lng:null,
        number:1,
        level:1,
        floor:0,
        carNumber:0,
        status:0,
        garageType:0,
        payType:0,
        isGateControl:0
      },
      areaEntity:{
        name:null,
        number:0,
        carNumber:0,
        status:0,
        garageType:0,
        payType:0,
        isGateControl:0
      },
      areaData:[],
      isUpdateShow:false,
      isAddShow:false,
      isDeleteShow:false,
      isAreaShow:false,
      isAreaDelete:false,
    }
  },
  created(){
    this.getParkList()
  },

  methods:{
    getParkList(_id){
      this.$global.httpGetWithToken(this,'park/all',{_id:_id}).then(res=>{
        console.log(res)
        if(_id){ //修改片区的时候获取列表
          this.parkEntity.area = res.data[0].area
          this.areaData = JSON.parse(JSON.stringify(this.parkEntity.area))
          this.parkData.forEach(item=>{
            if(item._id == res.data[0]._id){
              item = res.data[0]
            }
          })
        }else {
          this.parkData = res.data
        }
      })
    },
    updateParkDialog(item){
      this.parkEntity = item
      this.isUpdateShow = !this.isUpdateShow
    },
    updatePark(){
      this.$global.httpPostWithToken(this,'park/update/'+this.parkEntity._id,this.parkEntity).then(res=>{
        this.isUpdateShow = !this.isUpdateShow
        this.getParkList()
      })
    },
    addParkDialog(){
      this.isAddShow = !this.isAddShow
    },
    addPark(){
      this.$global.httpPostWithToken(this,'park/add',this.parkEntity).then(res=>{
        this.isAddShow = !this.isAddShow
        this.getParkList()
      })
    },
    deleteParkDialog(item){
      this.parkEntity = item
      this.isDeleteShow = !this.isDeleteShow
    },
    deletePark(){
      this.$global.httpGetWithToken(this,'park/delete/'+this.parkEntity._id).then(res=>{
        this.isDeleteShow = !this.isDeleteShow
        this.getParkList()
      })
    },
    allAreaDialog(item){
      this.parkEntity = item
      this.areaData = JSON.parse(JSON.stringify(this.parkEntity.area))
      this.isAreaShow = !this.isAreaShow
    },
    updateAreaDialog(item){
      this.areaData.forEach(area=>{
        this.$set(area,'isEdit',false)
      })
      this.$set(item,'isEdit',true)
    },
    updateArea(item){
      if(item._id){
        this.$global.httpPostWithToken(this,'area/update/'+item._id,item).then(res=>{
          this.$set(item,'isEdit',true)
          this.getParkList(this.parkEntity._id)
        })
      }else {
        this.$global.httpPostWithToken(this,'area/add/'+this.parkEntity._id,item).then(res=>{
          this.$set(item,'isEdit',true)
          this.getParkList(this.parkEntity._id)
        })
      }
    },
    addArea(){
      if(this.areaData.length == 0 || this.areaData[this.areaData.length-1]._id){
        this.areaData.forEach(area=>{
          this.$set(area,'isEdit',false)
        })
        this.areaData.push({name:'',number:0,lotType:1,carNumber:0,status:0,garageType:0,payType:0,isGateControl:true,isEdit:true})
      }else {
        this.$global.error(this,'请添加点击确认之后再添加下一条')
      }
    },
    deleteAreaDialog(item){
      this.areaEntity = item
      this.isAreaDelete = !this.isAreaDelete
    },
    deleteArea(){
      this.$global.httpGetWithToken(this,'area/delete/'+this.areaEntity._id).then(res=>{
        this.isAreaDelete = !this.isAreaDelete
        this.getParkList(this.parkEntity._id)
      })
    },
    cancelArea(item,index){
      if(item._id){
        console.log(this.parkEntity.area)
        this.areaData = JSON.parse(JSON.stringify(this.parkEntity.area))
      }else {
        // this.areaData.
        this.areaData.splice(index,1)
      }
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
