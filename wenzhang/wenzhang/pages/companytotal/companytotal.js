// pages/companytotal/companytotal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  confirm:function(t){
    console.log(t.detail.value)
    let nickname = t.detail.value
    app.util.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=member&do=company&nickname='+nickname,
      success:(t)=>{
        console.log(t)
        this.setData({
          everymember:t.data.payload.members,
          inputtext:'',
          member:[]
        })
      }
    })
  },
  jtdetail:function(t){
    var openid= t.currentTarget.dataset.openid
    wx.navigateTo({
      url: '/pages/persontotal/persontotal?openid='+openid,
    })
  },
  company:function(e){
    this.setData({
      companylists:!this.data.companylists
    })
  },
  phone:function(e){
    wx.makePhoneCall({
      phoneNumber:e.currentTarget.dataset.mobile
    })
  },
  companyselect:function(e){
    this.setData({
      allbumen:e.currentTarget.dataset.name
    })
    this.setData({
      companylists:!this.data.companylists
    })
  },
  onLoad: function (options) {
    var that = this;
    app.util.request({
      'url':'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=member&do=company',
      success(res){
        that.setData({
          member:res.data.payload.members
        })
      }
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