// pages/persontotal/persontotal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber:13464147038,
    time:false,
    looktime:"查看日期"
  },
  info:function(e){
    app.util.request({
      url:"https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=statistic&nickname="+e.detail.value,
      success:(t)=>{
        console.log(t)
        this.setData({
          statistic:t.data.payload.statistics,
          showinfo:''
        })
      }
    })
  },
  select:function(e){
    this.setData({
      time:!this.data.time
    })
  },
  myselect:function(t){
    this.setData({
      looktime:t.currentTarget.dataset.item,
      time:!this.data.time,
      
    })
  },
  call: function(e){
    wx.makePhoneCall({
      phoneNumber:e.currentTarget.dataset.moblie
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.openid){
      app.util.request({
        'url':'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=statistic&openid='+options.openid,
        success(res){
          that.setData({
            statistic:res.data.payload.statistics
          })
        }
      })
    }else{
      app.util.request({
        'url':"https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=statistic",
        success(res){
          console.log(res)
          that.setData({
            statistic:res.data.payload.statistics
          })
        }
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