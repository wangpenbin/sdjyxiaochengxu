// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      data:[],
      imgUrl: "http://192.168.31.163:8080/images", //图片地址
      img: "/appIndexCycleImage/e8b48b87-5d75-4555-80ba-6239c6b6e8e3.png"    //图片未正常显示出之后的地址
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
      wx.request({
        url: 'http://192.168.31.163:8080/proxy_manage/appNew/getGradutionPresonList',
        success(res){
          var data=res.data.data
        for(let val in data){
          data[val].length=3;
          data[val].forEach(function(value){
            console.log(value)
            
            if (!value.picture || value.picture==null){
              value.picture = that.data.imgUrl+that.data.img
            }else{
              value.picture = that.data.imgUrl + value.picture
            }
          })
          //  限制对象的长度为3
        }
       that.setData({
         data:res.data.data
       })
        }
      })
  },
  list(e){
    wx.navigateTo({
      url: '../list/list?address=' + e.currentTarget.dataset.address,
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