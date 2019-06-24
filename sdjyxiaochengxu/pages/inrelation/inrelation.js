// pages/inrelation/inrelation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    currentData: 0,
    // 上级
    superior:[],
     // 下级
    inferiors:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.showLoading({
      // loading弹框
      title: '加载中...',
    })
    wx.getStorage({
      key: 'key',
      success(res) {
        that.setData({
          token:res.data
        })
        wx.request({
          // 获取上级信息
          url: 'http://192.168.31.163:8080/proxy_manage/appNew/getParentProxyTeacher',
          data: {
            token: that.data.token,
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 默认值
          },
          success(res) {
            console.log(res)
            that.setData({
              superior:res.data.data
            })
          }
        });

        wx.request({
          // 获取下级信息
          url: 'http://192.168.31.163:8080/proxy_manage/appNew/getSublevelProxyTeacher',
          data: {
            token: that.data.token,
            id: 1
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 默认值
          },
          success(res) {
            that.setData({
              inferiors:res.data.data
            })
            wx.hideLoading()
          }

        })

      }
    })
  },
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  inter() {
    wx.navigateTo({
      url: '../relation/relation',
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
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