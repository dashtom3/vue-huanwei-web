import axios from 'axios'
export default{
  baseUrl: 'http://localhost:8002/',
  // baseUrl: 'http://39.104.135.253:8002/',
  // goPath: function (obj, url) {
  //   document.body.scrollTop = 0 + 'px'
  //   obj.$router.push({ name: url })
  // },
  ENUM:{
    CAR:['洒水车','洗扫车','吊装车','扫地车','管理用车'],
    CAR_WEIGHT:['4吨','5吨','8吨'],
    USER_TYPE:['超级管理员','普通用户']
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
