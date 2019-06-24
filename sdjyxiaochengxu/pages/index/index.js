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
        
  },
  onLoad: function () {
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  student() {
    // 跳到学生页
    wx.navigateTo({
      url: '../student/student',
    })
  },
  bigSearch(){
    wx.navigateTo({
      url: '../search/search?code='+"-1",
    })
  },
  cengji() {
    wx.navigateTo({
      url: '../inrelation/inrelation',
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