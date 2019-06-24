// pages/relation/relation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:"",
    id:'',
    superior: {},
    my:{},
    inferiors:{},
  },
  goRelaDetail:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    wx.getStorage({
      //获取用户id
      key: 'UserId',
      success: function (res) {
        that.setData({
          id:res.data
        })
       },
    }) 
    wx.getStorage({
      key: 'key',
      success(res) {
        that.setData({
          token: res.data
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

            that.setData({
              superior:res.data.data
            })
          }
        });
        wx.request({
          // 获取我的信息
          url: 'http://192.168.31.163:8080/proxy_manage/appNew/getProxyTeacher',
          method: 'post',
          data:{
            token:that.data.token
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 默认值
          },
          success(res) {
         
            that.setData({
              my: res.data.data
            })
          }
        })
        wx.request({
          // 获取下级信息
          url: 'http://192.168.31.163:8080/proxy_manage/appNew/getSublevelProxyTeacher',
          data: {
            token: that.data.token,
            id: that.data.id
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 默认值
          },
          success(res) {
            that.setData({
              inferiors: res.data.data
            })
            wx.hideLoading();
          }
        })

      }
    })
  },
  jump(e){
    console.log()
    wx.navigateTo({
      url: '../student/student?id='+e.target.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that =this 
   
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