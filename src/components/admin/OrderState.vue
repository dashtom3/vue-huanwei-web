<template>
  <div class="lot">
    <div class="lot-table">
      <div class="park-btn">
        <!-- <el-button type="primary" size="medium" @click="addParkDialog">添加停车场</el-button> -->
      </div>
      <div class="park-table">
        <el-table
          :data="orderData"
          border
          style="width: 100%">
          <el-table-column prop="_id" label="编号"></el-table-column>
          <el-table-column label="信息">
            <template slot-scope="scope">
              {{scope.row.car.name}}</br>车位编号{{scope.row.lot.number}}
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态">
            <template slot-scope="scope">
              <el-tag type="success" v-for="(value,key) in orderStateEnum" v-if="scope.row.state == key">{{value}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="order_time" label="预约时间"></el-table-column>
          <el-table-column prop="cancel_time" label="取消时间"></el-table-column>
          <el-table-column prop="lock_time" label="开锁时间"></el-table-column>
          <el-table-column prop="start_time" label="进位时间"></el-table-column>
          <el-table-column prop="off_time" label="出位时间"></el-table-column>
          <el-table-column prop="finish_time" label="结束时间"></el-table-column>
          <el-table-column prop="pay_time" label="付款时间"></el-table-column>
          <el-table-column prop="price" label="金额"></el-table-column>
          <el-table-column label="图片" width="300px">
            <template slot-scope="scope">
              <template v-for="item in scope.row.pic">
                <template v-for="item2 in JSON.parse(item.data)">
                  <img :src="item2.src+'?imageView2/2/w/100/h/100'">
                  {{item.create_time}}
                </template>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="异常">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.hasProblem == false">正常</el-tag>
              <el-tag type="danger" v-else class="park-red">异常</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="问题">
            <template slot-scope="scope">
              <!-- <span>{{scope.row.statement}}</span> -->
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="stateDialog(scope.row)">设置状态</el-button>
              <el-button type="text" size="mini" @click="changeMoneyDialog(scope.row)">修改金额</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="设置订单状态"
      :visible.sync="isStateShow"
      width="50%">
      <el-radio v-model="orderState" :label="key" v-for="(value,key,index) in orderStateEnum">{{value}}</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isStateShow = false">取 消</el-button>
        <el-button type="primary" @click="changeState">确 定</el-button>
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
      orderStateEnum:{0:'取消',1:'预约中',2:'已预约',5:'自动泊车',6:'降地锁',
      7:'暂停泊车',10:'停车',11:'自动取车',12:'暂停取车',13:'待支付',14:'完成'},
      orderState:null,
      isStateShow:false,
      isMoneyShow:false,
      orderData:[],
      orderEntity:null,
    }
  },
  created(){
    this.getOrderList()
  },

  methods:{
    getOrderList(){
      this.$global.httpGetWithToken(this,'order/all').then(res=>{
        this.orderData = res.data
        console.log(this.orderData)
      })
    },
    stateDialog(item){
      this.isStateShow = !this.isStateShow
      this.orderEntity = item
    },
    changeState(){
      this.$global.httpGetWithToken(this,'order/state/'+this.orderEntity._id,{state:this.orderState}).then(res=>{
        this.getOrderList()
        this.isStateShow = !this.isStateShow
      })
    },
    changeMoneyDialog(item){
      this.isMoneyShow = !this.isMoneyShow
      this.orderEntity = item
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
