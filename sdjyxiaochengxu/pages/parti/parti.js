// pages/parti/parti.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    console.log(options)
    var that =this;
      wx.request({
        url: 'http://192.168.31.163:8080/proxy_manage/appNew/getGraduatedByStudentId',
        data:{
          id:options.id
        },
        method:"post",
        header: {
          'content-type': 'application/x-www-form-urlencoded',// 默认值
        },
        success(res){
          
          var article=res.data.data.content;
          WxParse.wxParse('article', 'html', article, that, 5);
          that.setData({
            count:res.data.data
          })
          wx.hideLoading();
         
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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