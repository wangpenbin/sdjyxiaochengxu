// pages/student/student.js
import url from '../../utils/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    id: '',//
    data: {},
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log()
  
    var that = this;
    wx.showLoading({
      // loading弹框
      title: '加载中...',
    })
      wx.getStorage({
        key: 'UserId', 
        success: function (res) {
          if(options.id!=null){
            that.setData({
              id: options.id
            }) 
            console.log(1111)
          }else{
            that.setData({
              id: res.data
            })  
          }
        
        },
      })
    wx.getStorage({
      key: 'key',
      success: function (res) {
        that.setData({
          token: res.data
        })
        that.StudentVal();
      },
    })
  },
  detils(e) {
    // 跳到学生详情页
    wx.navigateTo({
      url: '../studentDet/studentDet?id=' + e.currentTarget.dataset.id,
    })
  },
  onPullDownRefresh(){
    var that =this;
    wx.showNavigationBarLoading();
    that.StudentVal();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  onReachBottom(){
    console.log(this.data.page)
    var that =this;
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: url.url+'/appNew/getStudentByProxyTeacherId2',
      method: 'post',
      data: {
        token: that.data.token,
        id: that.data.id,
        page: that.data.page+1,
        rows: 10,
        start: 1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',// 默认值
      },
      success(res) {
      console.log(res)
        const oldData = that.data.data
         if(res.data.data.rows==''){
          wx.showModal({
            showCancel:false,
            content: '到底了',
          })
         }else{
           ++that.data.page;
           that.setData({
             data: oldData.concat(res.data.data.rows)
           })
         }
      }
    })
  wx.hideLoading();
  },
  StudentVal(){
    var that =this;
    wx.request({
      url: url.url+'/appNew/getStudentByProxyTeacherId2',
      method: 'post',
      data: {
        token: that.data.token,
        id: that.data.id,
        page: that.data.page,
        rows: 10,
        start: 1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',// 默认值
      },
      success(res) {

        console.log()
        that.setData({
          data: res.data.data.rows,
        })
        wx.hideLoading();
      }
    })
  }
})