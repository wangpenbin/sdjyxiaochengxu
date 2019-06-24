// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      address:"",
      imgUrl:"http://192.168.31.163:8080/images", //拿到的图片地址前缀
      img:"/appIndexCycleImage/e8b48b87-5d75-4555-80ba-6239c6b6e8e3.png"    //图片未正常显示出之后的地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address:options.address
    })
    this.onPull();
  },
  sansa(e){
    console.log(e)
     wx.navigateTo({
       url: '../parti/parti?id=' + e.currentTarget.dataset.id,
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
  onPull(){
    var add =this.data.address
    // 下拉刷新
    var that = this;
    var that = this;
    wx.request({
      url: 'http://192.168.31.163:8080/proxy_manage/appNew/getGraduated',
      // method:"post",
      data: {
        address: add
      },
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded',// 默认值
      // },
      success(res) {
        console.log(res)
        var data = res.data.data
        data.forEach(function (val) {
          val.address = val.address.split("-")[0]
          console.log()
          if (val.picture == null) {
            val.picture = that.data.img
          }
        })
        that.setData({
          list: res.data.data
        })
        wx.hideLoading()
      }
    })
  

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
    wx.showLoading({
      title: '加载中',
    })
    this.onPull();
    wx.stopPullDownRefresh();
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