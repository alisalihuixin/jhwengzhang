//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    navState: 1,
    firstid: 1,
    viedoshare: false
  },
  cancel: function (e) {
    this.setData({
      viedoshare: false
    })
  },
  sharequan: function (e) {
    let userinfo = wx.getStorageSync('userInfo')
    if (!userinfo) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }

    wx.setStorageSync('title', this.data.sharetitle)
    wx.setStorageSync('thumburl', this.data.sharethumburl)
    wx.setStorageSync('brief', this.data.sharebrief)
    wx.navigateTo({
      url: '/pages/friends/friends?id=' + this.data.shareid + "&uid=" + wx.getStorageSync('userInfo').memberInfo.uid,
    })
  },
  viedoshare: function (e) {
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
    })
  },
  scroll: function (e) {
    this.setData({
      firstid: e.currentTarget.dataset.id
    })
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=article&type=1&categoryId=' + this.data.firstid,
      success: (t) => {
        this.setData({
          content: t.data.payload.articles
        })
      }
    })
    let index = e.currentTarget.dataset.index;
    // console.log(index)
    this.setData({
      navState: index
    })
  },
  category: function (e) {
    wx.navigateTo({
      url: '/pages/category/category?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad: function (options) {
    // let userinfo = wx.getStorageSync('userInfo')
    // if (!userinfo) {
    //   wx.redirectTo({
    //     url: '/pages/login/login',
    //   })
    // }
    //最新
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=inviter&do=last',
      success: (t) => {
        console.log(t.data.payload.inviter)
        this.setData({
          msgList: t.data.payload.inviter
        })
      }
    })
    //banner 文章
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=banner&type=1',
      success: (r) => {
        // console.log(r)
        if (r.statusCode == 200) {
          this.setData({
            bnrUrl: r.data.payload.banners
          })
        }
      }
    })
    //banner 视频
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=banner&type=2',
      success: (r) => {
        // console.log(r)
        if (r.statusCode == 200) {
          this.setData({
            bnrUrlvideo: r.data.payload.banners
          })
        }
      }
    })
    //助医美
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=category&type=1',
      success: (t) => {
        // console.log(t)
        this.setData({
          categorie: t.data.payload.categories
        })
      }
    })
    //artical
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=article&type=2&isHot=1',
      success: (t) => {
        this.setData({
          video: t.data.payload.articles
        })
      }
    })
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=article&type=2',
      success: (t) => {
        this.setData({
          video1: t.data.payload.articles
        })
      }
    })
  },
  //滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onShow: function (e) {
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=article&type=1&categoryId=' + this.data.firstid,
      success: (t) => {
        this.setData({
          content: t.data.payload.articles
        })
      }
    })
  },
  //文章查看
  changepic: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  onShareAppMessage: function (res) {

    // console.log(this.data.shareid)
    // console.log(wx.getStorageSync('userInfo').memberInfo.uid)
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
  },
  onShareTimeline() {

  }
})