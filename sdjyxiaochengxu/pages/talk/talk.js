// pages/talk/talk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:"",
      token:""
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
      key:'key',
      success: function (res) {
        console.log(res)
        that.setData({
          token: res.data
        })
        wx.request({
          // 请求
          url: 'http://192.168.31.163:8080/proxy_manage/appNew/getStudentConversationById',
          method:'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 默认值
          },
          data:{
            token:that.data.token,
            page:1,
            rows:5,
            id:options.id
          },
          success(res){
            that.setData({
              data:res.data.data.rows
            })
            console.log(res)
          }
        });
      
      },
    })
  },
  Detail(){
    var that = this;
    wx.request({
      url: 'http://192.168.31.163:8080/proxy_manage/appNew/getStudentConversationPicById',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',// 默认值
      },
      data: {
        token: that.data.token,
        id: '1'
      },
      success(res) {
        console.log(res)
        return false
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