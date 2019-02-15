
// import global from "../../global/global.js"
// import dtime from 'time-formater'
export default{

setView(myChart,data){
  this.option.title.text = data.title
  this.option.xAxis.data = data.xAxis
  var temp = []
  data.data.forEach(item=>{
    temp.push(item.name)
    item.type = 'line'
  })
  this.option.series = data.data
  this.option.legend.data = temp
  myChart.setOption(this.option)
},
option : {
    title: {
        text: '',
        top:20,
        right:0,
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:[]
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: []
}


}
