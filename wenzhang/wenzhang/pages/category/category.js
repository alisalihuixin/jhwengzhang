// pages/category/category.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  cancel: function (e) {
    this.setData({
      viedoshare: false
    })
  },
  sharequan: function (e) {
    wx.setStorageSync('title', this.data.sharetitle)
    wx.setStorageSync('thumburl', this.data.sharethumburl)
    wx.setStorageSync('brief', this.data.sharebrief)
    wx.navigateTo({
      url: '/pages/friends/friends?id=' + this.data.shareid,
    })
  },
  viedoshare: function (e) {
    // console.log(this.data.viedoshare)
    let userinfo = wx.getStorageSync('userInfo')
    if (!userinfo) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
    this.setData({
      viedoshare: !this.data.viedoshare,
      shareid: e.currentTarget.dataset.id,
      sharetitle: e.currentTarget.dataset.title,
      sharethumburl: e.currentTarget.dataset.thumburl,
      sharebrief: e.currentTarget.dataset.brief,
      shareuniacid: e.currentTarget.dataset.uniacid
    })
  },
  onLoad: function (options) {
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=article&type=1&categoryId=' + options.id,
      success: (t) => {
        this.setData({
          content: t.data.payload.articles
        })
      }
    })

  },
  changepic: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
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
  onShareAppMessage: function (res) {
    console.log()
    if (res.from === "button") {
      // console.log(res)
      app.util.request({
        url: "https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=interaction&do=save",
        method: "post",
        data: {
          targetId: this.data.shareid,
          targetType: 1,
          actionType: 2,
        },
        success: function (t) {
          console.log(t)
          // if (t.data.status == 0) {
          //   wx.showToast({
          //     title: '分享成功',
          //     icon: "success"
          //   })
          // } else {
          //   wx.showToast({
          //     title: '操作失败',
          //     icon: "none"
          //   })
          // }
        }
      })
    }
    return {
      title: this.data.sharetitle,
      path: "/pages/detail/detail?id=" + this.data.shareid + "&uid=" + wx.getStorageSync('userInfo').memberInfo.uid,
      imageUrl: this.data.sharethumburl
    }
  }
})