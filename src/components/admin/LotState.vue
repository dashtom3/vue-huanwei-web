<template>
  <div class="lot">
    <div class="lot-table">
      <template v-for="park in lotData">
        <template v-for="area in park.area">
          <div class="lot-title">
            <h3>{{park.name}}/{{area.name}} <el-button size="mini" type="primary" style="float:right;margin-right:50px;" @click="addLotDialog(area)">添加停车位</el-button></h3>
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
            <el-table-column label="地面状态">
              <template slot-scope="scope" v-if="scope.row.lock">
                <el-tag size="mini" type="success" v-if="scope.row.lock.isOnline == true">在线{{scope.row.lock.update_time}}</el-tag>
                <el-tag size="mini" type="danger" v-if="scope.row.lock.isOnline == false">离线{{scope.row.lock.update_time}}</el-tag>
                <el-tag size="mini" type="success" v-if="scope.row.lock.park2 == 1">有车</el-tag>
                <el-tag size="mini" type="success" v-if="scope.row.lock.park2 == 2">无车</el-tag>
                <el-tag size="mini" type="danger" v-if="scope.row.lock.park2 == 3">未知</el-tag>
                <el-tag size="mini" type="success" v-if="scope.row.lock.status == 1">立起</el-tag>
                <el-tag size="mini" type="success" v-if="scope.row.lock.status == 2">落下</el-tag>
                <el-tag size="mini" type="danger" v-if="scope.row.lock.status == 3">未知</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="地锁详细">
              <template slot-scope="scope" v-if="scope.row.lock">
                <el-tag size="mini" type="success">{{scope.row.lock.bat}}V</el-tag>
                <el-tag size="mini" type="success">{{$dtime(new Date(scope.row.lock.dt)).format('YYYY-MM-DD HH:mm:ss')}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="地磁详细">
              <template slot-scope="scope" v-if="scope.row.lock">
                <el-tag size="mini" type="success">{{scope.row.lock.nb}}</el-tag>
                <el-tag size="mini" type="success">{{scope.row.lock.power}}</el-tag>
                <el-tag size="mini" type="success">{{scope.row.lock.dt2}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="text" size="mini" v-if="scope.row.isEnable==0" @click=changeState(scope.row,0)>关闭平台</el-button>
                <el-button type="text" size="mini" v-else @click=changeState(scope.row,0)>开启平台</el-button>
                <el-button type="text" size="mini" v-if="scope.row.isThirdEnable ==0" @click=changeState(scope.row,1)>关闭第三方</el-button>
                <el-button type="text" size="mini" v-else @click=changeState(scope.row,1)>开启第三方</el-button>
                <el-button type="text" size="mini" @click=getLockInfo(scope.row)>查询地锁</el-button>
                <el-button type="text" size="mini" @click=stateDialog(scope.row)>设置状态</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </template>
    </div>
    <el-dialog
      title="设置车位状态"
      :visible.sync="isStateShow"
      width="50%">
      <el-radio v-model="lotStatus" :label="key" v-for="(value,key,index) in lotStatusEnum">{{value}}</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isStateShow = false">取 消</el-button>
        <el-button type="primary" @click="changeStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Lot',
  data () {
    return {
      lotData:[],
      lotStatusEnum:{0:'占用',1:'预约',2:'空闲'},
      areaEntity:null,
      lotEntity:null,
      lotStatus:null,
      isStateShow:false,
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
        res.data.forEach(park=>{
          park.area.forEach(area=>{
            var temp = []
            area.lot.forEach(lot=>{
              // if(lot.lock){
                temp.push(lot)
              // }
            })
            area.lot = temp
          })
        })
        this.lotData = res.data
        console.log(this.lotData)
      })
    },
    getLockInfo(item){
      if(item.lock){
        this.$global.httpGetWithToken(this,'lock/info/'+item.lock._id).then(res=>{
          this.getLotList()
        })
      }else {
        this.$global.error(this,'此车位尚无地锁')
      }

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
    },
    stateDialog(item){
      this.isStateShow = !this.isStateShow
      this.lotEntity = item
      console.log(item)
    },
    changeStatus(){
      this.$global.httpGetWithToken(this,'lot/status/'+this.lotEntity._id,{status:this.lotStatus}).then(res=>{
        this.getLotList()
        this.isStateShow = !this.isStateShow
      })
    },
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
