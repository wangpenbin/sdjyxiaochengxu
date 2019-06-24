// pages/studentDet/studentDet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    id:"",
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      // loading弹框
      title: '加载中...',
    })
    var that = this;
    that.setData({
      id:options.id
    })
   
    wx.getStorage({
      key: 'key',
      success: function(res) {
        that.setData({
            token:res.data
        })
        wx.request({
          // 获取学生信息的
          url: 'http://192.168.31.163:8080/proxy_manage/appNew/getStudentById3',
          data: {
            token: that.data.token,
            id:that.data.id //学生id
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 默认值
          },
          success(res) {
            console.log(res)
          that.setData({
            data:res.data.data
          })
            wx.hideLoading();
          }
        })
      },
    })
   
  },
  paymen(e) {
    // 跳到缴费页  
    wx.navigateTo({
      url: '../payment/payment?id=' + e.currentTarget.dataset.id,
    })
  },
  attend(e) {
    // 跳到考勤页
    wx.navigateTo({
      url: '../attendance/attendance?id=' + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
    })
  },
  result(e) {
    // 成绩页
    wx.navigateTo({
      url: '../results/results?id=' + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
    })
  },
  talk(e) {
    wx.navigateTo({
      url: '../talk/talk?id=' + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})