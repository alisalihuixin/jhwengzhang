
  var app = getApp()
Page({
  data: {
    
  },
  close:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  nowlogin:function(){
    wx.navigateTo({
      url: '/pages/shouquan/shouquan',
    })
  },
  onLoad: function (e) {
   
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  
})