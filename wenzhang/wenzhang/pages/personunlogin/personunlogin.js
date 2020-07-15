// pages/personunlogin/personunlogin.js
var app = getApp()
var userInfo = wx.getStorageSync('userInfo')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: false
  },
  changcompanyname: function (t) {
    wx.navigateTo({
      url: '/pages/changecompanyname/changecompanyname',
    })
  },
  usebook: function (t) {
    wx.navigateTo({
      url: '/pages/usebook/usebook',
    })
  },
  persontotal: function (t) {
    wx.navigateTo({
      url: '/pages/persontotal/persontotal',
    })
  },
  companytotal: function (e) {
    wx.navigateTo({
      url: '/pages/companytotal/companytotal',
    })
  },
  myerliao: function (e) {
    wx.navigateTo({
      url: '/pages/myerliao/myerliao',
    })
  },
  parter: function (e) {
    wx.navigateTo({
      url: '/pages/parter/parter',
    })
  },
  quit: function (t) {
    wx.redirectTo({
      url: '/pages/login/login',
    })
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      wx.removeStorage({
        key: 'userInfo',
      })
      this.setData({
        user: false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindvip: function (t) {
    wx.showToast({
      title: '敬请期待',
      icon: 'none',
      duration: 2000
    })
  },
  getPhoneNumber(e) {
    app.util.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=member&do=phone',
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData
      },
      success: (t) => {
        console.log(t)
        this.setData({
          phone: t.data.payload.phone.phoneNumber
        })
        wx.setStorageSync('phone', t.data.payload.phone.phoneNumber)
      }
    })
  },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   if (e.detail.userInfo) {
  //     app.globalData.userInfo = e.detail.userInfo
  //     this.setData({
  //       userInfo: e.detail.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else {
  //     this.openSetting();
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    if (!userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      this.setData({
        user: true
      })
    }
    this.setData({
      phone: wx.getStorageSync('phone') 
    })
    app.util.checkSession({
      success: function () {
        console.log(1111)
      },
      fail: function () {
        wx.login({
          success: function (res) {
            app.util.getWe7User(function (userInfo) {
              wx.setStorageSync('userInfo', userInfo)
            }, res.code)
          }
        })
      }
    })

    var self = this
    app.util.request({
      'url': "https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=member&do=detail",
      success: (res) => {
        // console.log(res)
        self.setData({
          membernum: res.data.payload.member
        })
      }
    })


  },
  login: function (e) {
    this.setData({
      user: true
    })
    // wx.navigateTo({
    //   url: '/pages/login/login',
    // })
    // console.log("this.data.user", this.data.user)
    // if (!this.data.user) {
    //   const self = this;
    //   app.util.getUserInfo(function (response) {
    //     wx.showToast({
    //       title: '登陆成功'
    //     })
    //     console.log(response)
    //     self.setData({
    //       userInfo: response,
    //       user: true
    //     })
    //   })
    // }
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
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    if (!userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      this.setData({
        user: true
      })
    }
    
    this.setData({
      phone: wx.getStorageSync('phone') 
    })

    var self = this
    app.util.request({
      'url': "https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=member&do=detail",
      success: (res) => {
        // console.log(res)
        self.setData({
          membernum: res.data.payload.member
        })
      }
    })
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
    if (res.from === "button") {
      console.log(res)
    }
    return {
      title: "钜惠文章",
      path: "/pages/index/index"
    }
  }
})