// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ["北京市", "北京市", "东城区"],
    time: "2019-05-20",
    code:"",
    value: "",//input的值
    flge:false,//取消按钮
    flge1: false,//中间的部分默认为
    student:false,
    imgUrl: "http://192.168.31.163:8080/images",//图片前缀
    xueFei:false,
    kaoQin:false,
    chengJi:false,
    NotFound:false, //没有找到之后显示的提示文字
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    token:"",
    data: [],   //获取到的数据
    information:"", //信息
    tab:"" //

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    var that =this;
    that.setData({
        code:options.code
    })
    // 获取token
    wx.getStorage({
      key: 'key',
      success: function(res) {
        that.setData({
          token:res.data
        })
      },
    })
    if(this.data.code==0){
        // 缺
        // 动态改变当前标题
      wx.setNavigationBarTitle({
        title: "学生查询"
      })
      that.setData({
        student:true
      })
    }else if(this.data.code==1){
      wx.setNavigationBarTitle({
        title:"就业查询"
      })
      that.setData({
        student: true
      })
    }else if(this.data.code==2){
      wx.setNavigationBarTitle({
        title: "学费查询"
      })
      that.setData({
        xueFei: true,
        student:false
      })
    }else if(this.data.code==3){
      wx.setNavigationBarTitle({
        title: "考勤查询"
      })
      that.setData({
        kaoQin:true
      })
    }else if(this.data.code==4){
      wx.setNavigationBarTitle({
        title: '成绩查询'
      })
      that.setData({
        chengJi: true
      })
    }else if(this.data.code==-1){
      that.setData({
        flge1:true,
        student:true
      })
    }
  },
  InputVal(e){
    var that =this;
    this.setData({
      value: e.detail.value
    })
  },
  quxiao(){
    // 点击取消时清空input的值
    // this.data.value=''
    this.setData({
      value:""
    })
  },
  blur(){
    var that =this;
    // 焦点消失时
    if (this.data.code == -1) {
      if (this.data.value == "") {
        that.setData({
          flge1: true
        })
      } else {
        that.setData({
          flge1: false
        })
      }
    }
  },
  foucs(e){
    var that =this;
    that.setData({
      flge:true,
      flge1:false,
      NotFound:false
    })
  },
  input(e){
    var that =this;
    this.setData({
      InputVal: e.detail.value
    })
  },
 Submit(e){
   //  请求数据
   var that = this;
      if(this.data.code==0 ){
        // 学生查询
        that.students();
      } else if (this.data.code == 1 || this.data.code == -1){
        // 就业查询
        wx.request({
          url: `http://192.168.31.163:8080/proxy_manage/appNew/getGraduated?name=${that.data.value}`,
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 默认值
          },
          success(res) {console.log(res)
            var data = res.data.data
            if(data==""){
                that.setData({
                  NotFound:true
                })
            }
            // 循环出地址并切割出数组
            data.forEach(function (val, index) {
              var addres = val.address.split("-")
              data[index].address = addres[0]
            })
            that.setData({
              data: data
            })
          }
        })

      } else if (this.data.code == 2) { 
      
        that.query();
      } else if (this.data.code == 3) {
        // 考勤
        that.query();

      } else if (this.data.code == 4) {
          // 成绩
        that.query();
      }
  },
  /**
 * 监听软键盘确认键
 */
  wxSearchConfirm: function (e) {

  },
  // 学费查询
  query(){
    console.log(11111);
        var that =this;
        var token=that.data.token;
        var student=that.data.value
        // 学费查询
        wx.request({
          url: 'http://192.168.31.163:8080/proxy_manage/appNew/getTokenIdLikeStuFee',
          data:{
            token:token,
            stuName:student
          },
          method:"POST",
          header: {
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"// 默认值
          },
          success(res){
            var data = res.data.data;
           var data= data.split(" ");
           var result={};//数据
           var obj =[];
           for(var val in data){
             var array = data[val].replace(",", "")
             var arr=array.split("=");
             arr[0]=arr[0].replace(/\W/,"");
            if(arr[1]){
                arr[1] = arr[1].replace("", "");
            }
              obj.push(arr)
           }
           for(var i=1;i<21;i++){
             var a=obj[i];
              result[a[0]] = a[1];
           }
            that.setData({
              data: result
            })
            console.log(result)
            var id=result.id
            if(that.data.code==2){
              // 获取学费列表
              wx.request({
                url: 'http://192.168.31.163:8080/proxy_manage/appNew/getFeeByStudentId2',
                data: {
                  token:that.data.token,
                  id:id,
                  page:1,
                  rows:30
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"// 默认值
                },
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: function(res) {
                  console.log(res)
                  that.setData({
                      tab:res.data.data.rows
                  })
                },
                fail: function(res) {},
                complete: function(res) {},
              })
            } else if (that.data.code == 3){
              wx.request({
                url: 'http://192.168.31.163:8080/proxy_manage/appNew/getAttenceByStudentId',
                data: {
                 token:that.data.token,
                 id:id
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"// 默认值
                },
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: function(res) {
                  console.log(res)
                  that.setData({
                    tab:res.data.data
                  })
                },
                fail: function(res) {},
                complete: function(res) {},
              })
            } else if (that.data.code == 4){
                wx.request({
                  url: 'http://192.168.31.163:8080/proxy_manage/appNew/getExamByStudentId',
                  data: {
                    token: that.data.token,
                    id: id,
                    page: 1,
                    rows: 10
                  },
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"// 默认值
                  },
                  method: 'POST',
                  dataType: 'json',
                  responseType: 'text',
                  success: function(res) {
                    console.log(res)
                    if(!res.data.data.rows){
                      return false
                    }else{
                      that.setData({
                        tab: res.data.data.rows
                      })
                    }
                  },
                  fail: function(res) {},
                  complete: function(res) {},
                })
            }
          }
        })
        
  },
  students(){
    // 请求学生
      var that =this;
      var id ='';       
        wx.request({
          url: 'http://192.168.31.163:8080/proxy_manage/appNew/likeStuName',
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 默认值
          },
          data:{
              token:that.data.token,
              stuName:that.data.value
          },
          success(res){
           
            var data =res.data.data
             // 循环出地址并切割出数组
            data.forEach(function (val, index) {
              var addres = val.address.split("-")
              data[index].address = addres[0]
            })
            console.log(data)
            that.setData({
              data: data,
            })
          }
        })
   
    
  },
  employment(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
      // 就业详情页
    if (this.data.code == 0){
        wx.navigateTo({
          url: '../studentDet/studentDet?id='+id,
        })
    }else if (this.data.code == 1 || this.data.code == -1){
      wx.navigateTo({
        url: '../parti/parti?id=' + id,
      })
    }
  },

})