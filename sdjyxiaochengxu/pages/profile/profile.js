// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:"",
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    var that =this;
    var token=null;
    wx.getStorage({
      key: 'key',
      success: function (res) {
        that.setData({
          token:res.data
        })
      }
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that =this;
    wx.request({
      url: 'http://192.168.31.163:8080/proxy_manage/appNew/getProxyTeacher2',
      method: "post",
      data: {
        token: that.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',// 默认值
      },
      success(res) {
        console.log(res)
          that.setData({
              data:res.data.data
       })
       wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})