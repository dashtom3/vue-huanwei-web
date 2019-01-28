import axios from 'axios'
export default{
  baseUrl: 'http://localhost:6801/',
  // baseUrl: 'http://61.190.61.78:6801/',
  // goPath: function (obj, url) {
  //   document.body.scrollTop = 0 + 'px'
  //   obj.$router.push({ name: url })
  // },
  ENUM:{
    CAR:['洒水车','洗扫车','吊装车','扫地车','管理用车'],
    CAR_PIC:{'洒水车':['watering_car_l.png','watering_car_r.png'],'洗扫车':['clean_car_l.png','clean_car_r.png'],'吊装车':['crane_l.png','crane_r.png'],'扫地车':['car_l.png','car_r.png'],'管理用车':['car_l.png','car_r.png']},
    CAR_WEIGHT:['4吨','5吨','8吨'],
    USER_TYPE:['超级管理员','普通用户']
  },
  getRad(d){
      var PI = Math.PI;
      return d*PI/180.0;
  },
  getFlatternDistance(lat1,lng1,lat2,lng2){
      var EARTH_RADIUS = 6378137.0;
      var f = this.getRad((lat1 + lat2)/2);
      var g = this.getRad((lat1 - lat2)/2);
      var l = this.getRad((lng1 - lng2)/2);

      var sg = Math.sin(g);
      var sl = Math.sin(l);
      var sf = Math.sin(f);

      var s,c,w,r,d,h1,h2;
      var a = EARTH_RADIUS;
      var fl = 1/298.257;

      sg = sg*sg;
      sl = sl*sl;
      sf = sf*sf;

      s = sg*(1-sl) + (1-sf)*sl;
      c = (1-sg)*(1-sl) + sf*sl;

      w = Math.atan(Math.sqrt(s/c));
      r = Math.sqrt(s*c)/w;
      d = 2*w*a;
      h1 = (3*r -1)/2/c;
      h2 = (3*r +1)/2/s;

      return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
  },
  success (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'success',
      duration: '2000',
      onClose: function () {
        if (url !== '' && url != null) {
          obj.$router.push(url)
        }
      }
    })
  },
  error (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'error',
      duration: '2000',
      onClose: function () {
        if (url !== '' && url != null) {
          obj.$router.push(url)
        }
      }
    })
  },
  httpGet(self,url,data){
    return new Promise((resolve, reject) => {
      axios.get(this.baseUrl + url + "?" + this.getHttpData(data)).then((res)=>{
          if(res.data.status == 1){
            resolve(res.data)
          }else {
            this.error(self,res.data.message,'')
            reject(res.data.message)
          }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpGetWithToken(self,url,data){
    return new Promise((resolve, reject) => {
      axios.get(this.baseUrl + url + "?token="+this.getToken() + this.getHttpData(data)).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpPost(self,url,data){
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + url,data).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpPostWithToken(self,url,data){
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + url + "?token="+this.getToken(),data).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((error)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  postHttpData: function (data) {
    var temp = new FormData()
    for (var i in data) {
      if (data[i] != null) {
        temp.append(i, data[i])
      }
    }
    return temp
  },
  postHttpDataWithToken: function (data) {
    var temp = this.postHttpData(data)
    temp.append('token', this.getToken())
    return temp
  },
  getHttpData: function (data) {
    var temp = ''
    for (var i in data) {
      if (data[i] != null && data[i] !== 'null') {
        temp = temp + '&' + i + '=' + data[i]
      }
    }
    return temp
  },
  getToken: function () {
    var date = localStorage.getItem('cygtokentime')
    if (new Date().getTime() - date > 3600000) {
      return null
    }
    return localStorage.getItem('cygtoken')
  },
  setToken: function (token) {
    localStorage.setItem('cygtoken', token)
    localStorage.setItem('cygtokentime', new Date().getTime())
  },
  getUser: function () {
    return JSON.parse(localStorage.getItem('cyguser'))
  },
  setUser: function (caruser) {
    localStorage.setItem('cyguser', JSON.stringify(caruser))
  },
  logout: function () {
    localStorage.removeItem('cyguser')
    localStorage.removeItem('cygtokentime')
    localStorage.removeItem('cygtoken')
  }
}
