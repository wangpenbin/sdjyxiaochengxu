//index.js
//获取应用实例
const app = getApp()
import common from '../../utils/common.js'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    flage:false,
    hasUserInfo: false,
    pass:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    token:""
  },
  //事件处理函数
  onLoad: function () {
    console.log()
    var that= this;
   wx.getStorage({
     key: 'key',
     success: function(res) {
       console.log(res)
      that.setData({
        token:res.data
      })
       if(res.data==''){
         this.data.hasUserInfo=true;
      }
       wx.request({
         url: 'http://192.168.31.163:8080/proxy_manage/appNew/getProxyTeacher2',
         method: "POST",
         data: {
           token: res.data
         },
         header: {
           'content-type': 'application/x-www-form-urlencoded',// 默认值
         },
         success(res) {
           console.log(res)
           wx.setStorage({
             key: 'UserId',
             // 保存招生老师id
             data: res.data.data.id,
           })
         }
       })
     },
   })
   
    if (this.data.userInfo=="" && this.data.hasUserInfo==false &&this.data.token==''){
      this.logon();
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          if(wx.getStorageInfoSync('key')){
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
         
        }
      })
    }
  },
  onShow(){
    this.onLoad();
  },
  OutLog(){
   this.setData({
     hasUserInfo:false
   })
    wx.removeStorage({       
      key: 'key',
      success: function(res) {},
    })
  },
  logon(e) {
    wx.navigateTo({
      url: '../password/password',
    })

  },
  // 资料页
  getProfiles() {
    if (this.data.userInfo != '' && this.data.hasUserInfo==true){
      wx.navigateTo({
        url: '../profile/profile',
      })
      return false;
    }else{
      wx.showModal({
      //  title:"请登录",
        content:"请登录或绑定手机号后查看",
        showCancel:false
     })
    }
  },
  getAbout() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  getUserInfo: function(e){
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      // hasUserInfo: true
    })
  }
})

