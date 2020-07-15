// pages/changecompanyname/changecompanyname.js
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
  input: function (e) {
    console.log(e.detail.value)
    this.data.newcompany = e.detail.value
  },
  submit: function (t) {
    app.util.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=member&do=save',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        companyName: this.data.newcompany
      },
      success: (t) => {
        console.log(t)
        if (t.data.status == 0) {
          this.setData({
            company: [{
              companyname: this.data.newcompany
            }]
          })
          wx.showToast({
            title: '修改成功',
            icon: "success"
          })
        } else if (t.data.status == 2) {
          wx.showModal({
            title: '您还未登录',
            content: '',
            cancelText: '取消',
            confirmText: '登录',
            success(res) {
              if (res.cancel) {
                // 用户点击了取消属性的按钮，
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              } else if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: "none"
          })
        }
        this.setData({
          newcompany: ""
        })
      }
    })
  },
  onLoad: function (options) {
    let nickname = wx.getStorageSync('userInfo').memberInfo.nickname;
    app.util.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=member&do=company&nickname=' + nickname,
      success: (t) => {
        this.setData({
          company: t.data.payload.members
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