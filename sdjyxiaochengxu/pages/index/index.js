//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/common.js'

Page({
  data: {
    img: [{ id: 0, img: "../../utils/img/tu1.png", 'text': "学生查询", "tap":"search"},
        { id: 1, img: "../../utils/img/tu3.png", 'text': '就业查询', "tap":"search"},
        { id: 2, img: '../../utils/img/tu2.png', "text": "学费查询", "tap":"search"},
        { id: 3, img: "../../utils/img/tu4.png", "text": "考勤查询", "tap":"search"},
        { id: 4, "img": '../../utils/img/tu5.jpg', "text": "成绩查询", "tap":"search"},
        { id: 5, "img":"../../utils/img/tu6.jpg","text":"敬请期待"}],
    token:"",
        
  },
  onLoad: function () {
    var that =this;
   wx.getStorage({
     key: 'key',
     success: function(res) {
       console.log(res.data)
      that.setData({
        token:res.data
      })
     },
   })
   
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  student() {
    // 我的学生
    if (this.data.token!=""){
      wx.navigateTo({
        url: '../student/student',
      })
    }else{
        wx.showToast({
          title: '请登录后查看',
          icon:"none"
        })
    }
   
  },
  cengji() {
    // 上下层级
    if(this.data.token!=""){
      wx.navigateTo({
        url: '../inrelation/inrelation',
      })
    }else{
      wx.showToast({
        title: '请登录后查看',
        icon: "none"
      })
    }
   
  },
  bigSearch(){
    wx.navigateTo({
      url: '../search/search?code='+"-1",
    })
  },
 
  search(e){
    console.log(e.currentTarget.dataset.code)
    wx.navigateTo({
      url: '../search/search?code=' + e.currentTarget.dataset.code,
    })
}


})
/**为code1时只有姓名和地区，
 * 为code2时只有姓名和时间
 */