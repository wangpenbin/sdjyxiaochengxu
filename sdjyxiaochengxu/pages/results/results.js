// pages/results/results.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    token:"",
    name:"",
    data:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      name:options.name
    })
    wx.getStorage({
      key: 'key',
      success: function (res) {
        that.setData({
          token: res.data
        })
        wx.request({
          // 获取学生信息的
          url: 'http://192.168.31.163:8080/proxy_manage/appNew/getExamByStudentId',
          data: {
            token: that.data.token,
            page:1,
            rows:5,
            id: options.id //学生id
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 默认值
          },
          success(res) {
            console.log(res)
            that.setData({
              data:res.data.data.rows
            })
          }
        })
      },
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