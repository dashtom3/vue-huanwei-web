
export default{
scale : 1,
echartData : [],
rich : {
    yellow: {
        color: "#ffc72b",
        fontSize: 30 * this.scale,
        padding: [2, 4],
        align: 'center'
    },
    total: {
        color: "#ffc72b",
        fontSize: 18 * this.scale,
        align: 'center'
    },
    white: {
        color: "#fff",
        align: 'center',
        fontSize: 14 * this.scale,
        padding: [3, 0]
    },
    blue: {
        color: '#49dff0',
        fontSize: 16 * this.scale,
        align: 'center'
    },
    hr: {
        borderColor: '#0b5263',
        width: '100%',
        borderWidth: 1,
        height: 0,
    }
},
setView(myChart,data){
  this.echartData = data.data

  console.log(data)
  var option = {
      // backgroundColor: '#031f2d',
      title: {
          text:data.title,
          left:'center',
          top:'50%',
          padding:[10,0],
          textStyle:{
              color:'white',
              fontSize:16*this.scale,
              align:'center'
          }
      },
      legend: {
          selectedMode:false,
          formatter: (name)=> {
              var total = 0; //各科正确率总和
              // var averagePercent; //综合正确率

              this.echartData.forEach((value, index, array)=> {
                  total += value.value;
              });
              return '{total|' + total + '}';
          },
          data: [this.echartData[0].name],
          // data: ['高等教育学'],
          // itemGap: 50,
          left: 'center',
          top: 'center',
          icon: 'none',
          align:'center',
          textStyle: {
              color: "#999999",
              fontSize: 20 * this.scale,
              rich: this.rich
          },
      },
      series: [{
          name: '总考生数量',
          type: 'pie',
          radius: ['42%', '50%'],
          hoverAnimation: false,
          color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4' ,'#999999'],
          label: {
              normal: {
                  formatter: (params, ticket, callback)=> {
                      var total = 0; //考生总数量
                      var percent = 0; //考生占比
                      this.echartData.forEach(function(value, index, array) {
                          total += value.value;
                      });
                      percent = ((params.value / total) * 100).toFixed(1);
                      return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}';
                  },
                  rich: this.rich
              },
          },
          labelLine: {
              normal: {
                  length: 40 * this.scale,
                  length2: 0,
                  lineStyle: {
                      color: '#0b5263'
                  }
              }
          },
          data: this.echartData
      }]
    }
  myChart.setOption(option)
},

}
