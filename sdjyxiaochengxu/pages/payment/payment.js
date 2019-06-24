// pages/payment/payment.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
        token: "",
        data:[]
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
          var that = this;
          wx.getStorage({
            key: 'key',
            success: function(res) {
              console.log(res)
              that.setData({
                token: res.data,
                id:options.id,
                page:1,
                rows:10
              })
              wx.request({
                // 请求
                url: 'http://192.168.31.163:8080//proxy_manage/appNew/getFeeByStudentId2',
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded', // 默认值
                },
                data: {
                  token: that.data.token,
                  page: "1",
                  rows: "10",
                  id: options.id
                },
                success(res) {
                  that.setData({
                    data:res.data.data.rows
                  })
                  console.log(res)
                }
              })
            },
          })
      }
          

          
})