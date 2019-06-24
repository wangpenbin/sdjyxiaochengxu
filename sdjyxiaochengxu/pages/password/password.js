// pages/password/password.js
import WxValidate from '../../utils/WxValidate.js'
import utils from '../../utils/util.js'
import common from '../../utils/common.js'
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    image:"",
    name:"",
    passworld: "密码",
    qiehuan: "用密码登录",
    placeholder: "确认密码",
    value: "获取验证码", //获取验证码按钮的值
    time: 60, //验证码的获取时间秒为单位
    disabled: "", //验证码禁用
    tel: "", //电话的值
    code: "", //密码或验证的值 
    errorText: "", //错误提示文字
  },
  
  
  // 验证码和密码切换
  qiehuan() {
    var flag = this.data.flag
    var that = this;
    if (flag == false) {
      that.setData({
        flag: true,
        passworld: "验证码",
        qiehuan: "用验证码登录",
        placeholder: "确认验证码"

      })
    } else {
      that.setData({
        flag: false,
        passworld: "密码",
        qiehuan: "用密码登录",
        placeholder: "确认密码"

      })
    }
  },
  // 验证码60秒计时
  authCode() {
    var value = this.data.value
    var i = this.data.time;
    var that = this;
    var tel = this.data.tel;
    if (tel == "") {
      return false
    }

    wx.request({
      url: 'http://192.168.31.163:8080/proxy_manage/appNew/appMseeage',
      data: {
        appTel: tel
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
          wx.showToast({
            title: '发送成功',
          })
  
      }
    })
    if (i = 60) {
      let a = setInterval(function() {
        --i;
        that.setData({
          value: `${i}秒后重新发送`,
          disabled: "disabled"
        })
        if (i == -1) {
          i = 60;
          clearInterval(a);
          that.setData({
            value: "获取验证码",
            disabled: ""
          })
        }
      }, 1000)
    }
  },
  //接受微信图片
  onLoad() {
    this.setData({
      image: app.globalData.userInfo.avatarUrl
    })
    console.log()
  },
  onReady() {
  },
  // 手机号的值
  passwo(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  // 验证码的值
  passwo1(e) {
    this.setData({
      code: e.detail.value
    })
  },
  // 登录
  loginBtnClick() {
    var that = this;
    let telPhoye = /^1[34578]\d{9}$/; // 手机号正则
    if (this.data.flag == true) {
      that.setData({
        errorText: ['验证码不能为空', "验证码错误", "验证码失效"]
      })
    } else {
      that.setData({
        errorText: ['密码不能为空', "密码错误"]
      })
    }
    if (this.data.tel == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
    } else if (this.data.code == "") {
      wx.showToast({
        title: that.data.errorText[0],
        icon: "none"
      })
      return false
    } else if (!telPhoye.test(this.data.tel)) {
      // 手机号正则验证
      wx.showToast({
        title: '手机号错误',
        icon: "none"
      })
      return false;
    } else {
      // 发送数据
      var flag = this.data.flag
      if (flag == false) {
        // 账号登录
       
        wx.request({
          url: 'http://192.168.31.163:8080/proxy_manage/appNew/appLogin',
          data: {
            appTel: that.data.tel,
            appPassword: that.data.code
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
          },
          success(res) {
            console.log(res)
              wx.setStorageSync("key", res.data.data.token)
              
              wx.showToast({
                title: '登录成功',
                success(){
                  console.log(11111)
                  wx.navigateBack({ delta:-1})
                },
                fail(){
                  console.log(99999)
                }

              })
            }
        })
      } else if (flag == true) {
        // 验证码登录
        console.log(1111)
        wx.request({
          url: `http://192.168.31.163:8080/proxy_manage/appNew/appUserLogin?tel=${that.data.tel}&code=${that.data.code}`,
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
          },
          success(res) {
            console.log(res)
            if (res.data.msg == "验证码错误") {
                wx.showToast({
                  title: '验证码错误',
                  icon:"none"
                })
              return false
            } else {
              wx.setStorageSync("key", res.data.data.token)
              wx.showToast({
                title: '登录成功',
                success(){
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
            })
            }
          
          },
          fail(e){
            console.log(e)

          console.log("err")
          }
        })
      }
    }


  }
})