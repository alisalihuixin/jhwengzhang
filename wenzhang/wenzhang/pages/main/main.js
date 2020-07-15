// pages/main/main.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flage: false,
    firstid: 6,
    secondid: 0,
    navState: 6,
    status: 0
  },
  scroll: function (e) {
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=article&type=1&feedCategoryId=' + e.currentTarget.dataset.id,
      success: (t) => {
        this.setData({
          content: t.data.payload.articles
        })
      }
    })
    let index = e.currentTarget.dataset.id;
    this.setData({
      navState: index,
      status: 0
    })
    console.log("navState", this.data.navState)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  changepic: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  getmy: function (e) {
    console.log(e.currentTarget.dataset.id)
    app.util.request({
      'url': 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=interaction&do=save',
      'method': 'POST',
      'header': {
        "content-type": "application/x-www-form-urlencoded"
      },
      'data': {
        targetId: e.currentTarget.dataset.id,
        targetType: 1,
        actionType: 1
      },
      success(t) {
        console.log(t)
        if (t.data.status == 0) {
          wx.showToast({
            title: '成为我的饵料',
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
            title: '操作失败',
            icon: "none"
          })
        }
      }
    })
  },
  change: function (e) {
    let id = e.currentTarget.dataset.id
    console.log("id", id)
    this.setData({
      firstid: e.currentTarget.dataset.id,
      subcategories: this.data.left[id].subcategories || [],
      flage: !this.data.flage,
      status: this.data.navState == id ? this.data.status : 0
    })

  },
  click: function (t) {
    console.log("erji", t.currentTarget.dataset.id)
    let index = t.currentTarget.dataset.id
    this.setData({
      secondid: t.currentTarget.dataset || 0,
      status: index
    })
  },
  submit: function (t) {
    this.setData({
      flage: !this.data.flage
    })
    console.log("firstid", this.data.firstid)
    console.log("secondid", this.data.secondid)

    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=article&type=1&feedCategoryId=' + this.data.firstid + '&subFeedCategoryId=' + this.data.secondid,
      success: (t) => {
        console.log(t)
        this.setData({
          content: t.data.payload.articles
        })
      }
    })
  },
  onLoad: function (options) {
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=category&type=2',
      success: (t) => {
        // console.log(t)
        this.setData({
          left: t.data.payload.categories
        })
      }
    })
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=article&type=1&feedCategoryId=' + this.data.firstid + '&subFeedCategoryId=' + this.data.secondid,
      success: (t) => {
        // console.log(t)
        this.setData({
          content: t.data.payload.articles
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
  onShow: function () {},

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