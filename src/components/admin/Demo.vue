<template>
  <div class="demo">

    <div class="pie">
      <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
    </div>
    <div class="pie">
      <div id="myChart1" :style="{width: '100%', height: '100%'}"></div>
    </div>
    <div class="pie">
      <div id="myChart2" :style="{width: '100%', height: '100%'}"></div>
    </div>
    <div class="lot-table">
      <el-table
        :data="data2"
        size=mini
        style="width: 100%">
        <el-table-column
          label="名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="链接"
          width="400px">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.url}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="二级链接个数">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.all}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="错误数">
          <template slot-scope="scope">
            <el-tag type="danger">{{ scope.row.number}}</el-tag>
            <!-- <span style="margin-left: 10px" class="red"></span> -->

          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.$index%3 !=0">pending</el-tag>
            <!-- <span style="margin-left: 10px" class="red"></span> -->
            <el-tag type="success" v-if="scope.$index%3 ==0">success</el-tag>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap';


export default {
  name: 'Demo',
  data () {
    return {

      data2:[{name:'Jordan',url:'https://www.nike.com/cn/zh_cn/c/jordan',status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:'Homepage',url:'https://www.nike.com/cn/zh_cn/',status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Men's Landing Page",	url:"https://www.nike.com/cn/zh_cn/c/men",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Women's Landing Page",	url:"https://www.nike.com/cn/zh_cn/c/women",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Young Athlete",	url:"https://www.nike.com/cn/zh_cn/c/kids",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Boys",	url:"https://www.nike.com/cn/zh_cn/c/boys",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Girls",url:"https://www.nike.com/cn/zh_cn/c/girls",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Running",	url:"https://www.nike.com/cn/zh_cn/c/running",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Basketball",url:	"https://www.nike.com/cn/zh_cn/c/basketball",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"NBA",url:	"https://www.nike.com/cn/zh_cn/c/nba",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Nike Sportswear",url:	"https://www.nike.com/cn/zh_cn/c/sportswear",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Football",url:	"https://www.nike.com/cn/zh_cn/c/football",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"NikeLab",url:	"https://www.nike.com/cn/zh_cn/c/nikelab",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Men's Training",	url:"https://www.nike.com/cn/zh_cn/c/training",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Women's Training",	url:"https://www.nike.com/cn/zh_cn/c/womens-training",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"NIKEiD",	url:"https://www.nike.com/cn/zh_cn/c/nikeid",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Skateboarding",url:	"https://www.nike.com/cn/zh_cn/c/skateboarding",status:1,number:Math.ceil(Math.random() * 10),all:120},
            {name:"Tennis",url:	"https://www.nike.com/cn/zh_cn/c/tennis/men",status:1,number:Math.ceil(Math.random() * 10),all:120}]
    }
  },
  created(){
    this.getLotList()
  },
  mounted(){
    this.drawLine()
    this.drawLine2()
    this.drawLine3()
  },
  methods:{
    getLotList(){
      this.$global.httpGetWithToken(this,'park/all').then(res=>{
        this.lotData = res.data
        console.log(this.lotData)
      })
    },
    drawLine3(){
    var option = {
    title : {
        text: '各二级链接个数',
        subtext: '总个数:1030',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // legend: {
    //     // orient: 'vertical',
    //     // left: 'left',
    //     bottom:'bottom',
    //     data: ['Jordan','Homepage',"Men's Landing Page","Women's Landing Page",'Young Athlete']
    // },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '4Wd5%',
            center: ['50%', '60%'],
            roseType : 'radius',
            data:[
                {value:100, name:'Jordan'},
                {value:120, name:'Homepage'},
                {value:88, name:"Men's Landing Page"},
                {value:76, name:"Women's Landing Page"},
                {value:120, name:"Young Athlete"},
                {value:47, name:"Boys"},
                {value:60, name:"Girls"},
                {value:58, name:"Running"},
                {value:150, name:"Basketball"},
                {value:27, name:"NBA"},
                {value:35, name:"Nike Sportswear"},
                {value:12, name:"Football"},
                {value:10, name:"NikeLab"}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}
let myChart = this.$echarts.init(document.getElementById('myChart2'))
myChart.setOption(option);
},
    drawLine2(){
    var option = {
    title : {
        text: '错误链接分布',
        subtext: '总个数:127',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // legend: {
    //     // orient: 'vertical',
    //     // left: 'left',
    //     bottom:'bottom',
    //     data: ['Jordan','Homepage',"Men's Landing Page","Women's Landing Page",'Young Athlete']
    // },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '45%',
            center: ['50%', '60%'],
            data:[
                {value:10, name:'Jordan'},
                {value:5, name:'Homepage'},
                {value:13, name:"Men's Landing Page"},
                {value:1, name:"Women's Landing Page"},
                {value:20, name:"Young Athlete"},
                {value:25, name:"Boys"},
                {value:30, name:"Girls"},
                {value:7, name:"Running"},
                {value:9, name:"Basketball"}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
  let myChart = this.$echarts.init(document.getElementById('myChart1'))
  myChart.setOption(option);
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        // app.title = '嵌套环形图';

var option = {
  title : {
          text: '当前网站运行状况',
          subtext: '2018-11-12 05:00:00',
          x:'center'
  },
  tooltip: {
        trigger: 'item',
        formatter: "{b} <br/>{c} ({d}%)"
    },
    legend: {
      bottom:'bottom',
      data: ['总链接数','错误数']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['20%', '35%'],
            label: {
                normal: {
                    formatter: '{b|{b}}\n{hr|}\n  {c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // position:'center',
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 12,
                            lineHeight: 20,
                            align:'center'
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2,
                            lineHeight:20
                        }
                    }
                }
            },
            data:[
              {value:127, name:'错误数'},
              {value:1320, name:'总链接数'}
            ]
        }
    ]

}
        myChart.setOption(option);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo{
  min-height: 100%;
  background-color: #ECEFF3;
  position: absolute;
  width: 100%;
  padding:30px;
}
.pie {
  height: 300px;
  width:30%;
  /* padding: 10px; */
  display: inline-block;
  background-color: white;
  margin-right: 30px;
}
.amap-wrapper {
  width: 100%;
  height:100%;
}
.lot-title {
  margin: 10px;
  font-size: 16px;
}
.red {
  background-color: red;
  margin: 10px;
}
</style>
