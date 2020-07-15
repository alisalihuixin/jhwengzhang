// pages/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flage: false,
    ff:false
  },

  sharequan: function (e) {
    wx.setStorageSync('title', this.data.sharetitle)
    wx.setStorageSync('thumburl', this.data.sharethumburl)
    wx.setStorageSync('brief', this.data.sharebrief)
    wx.navigateTo({
      url: '/pages/friends/friends?id=' + this.data.shareid,
    })
  },
  cancel: function (e) {
    this.setData({
      viedoshare: false
    })
  },
  wenshare: function (e) {
    // console.log(111)
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
    })
  },
  everysharequan: function (e) {
    wx.setStorageSync('title', e.currentTarget.dataset.title)
    wx.setStorageSync('thumburl', e.currentTarget.dataset.thumburl)
    wx.setStorageSync('brief', e.currentTarget.dataset.brief)
    wx.navigateTo({
      url: '/pages/friends/friends?id=' + e.currentTarget.dataset.id,
    })
  },
  changepic: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  click: function () {
    this.setData({
      ff: true
    })
  },
  onLoad: function (options) {
    app.util.checkSession({
      success: function () {
        console.log(1111)
      },
      fail: function () {
        console.log("fail")
        wx.login({
          success: function (res) {
            wx.navigateTo({
              url: '/pages/getphone/getphone',
            })
            app.util.getWe7User(function (userInfo) {
              wx.setStorageSync('userInfo', userInfo)
            }, res.code)
          }
        })
        // wx.navigateTo({
        //   url: '/pages/login/login',
        // })
      }
    })
    
    if(options.scene){
      var scene = decodeURIComponent(options.scene);
      var obj = [];
      scene.split('&').forEach((component) => {
        var part = component.split('=')
        obj[part[0]] = part[1];
    })
    console.log(obj.id)
      var id = obj.id
      var uid = obj.uid
    }else{
      var id = options.id;
      var uid = options.uid;
    }
    let userInfo = wx.getStorageSync('userInfo')
   
    this.setData({
      options: JSON.stringify(options),
      shareid:id
    })
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=util&do=getQrcode&id=' + id + '&uid=' + uid,
      success: function (t) {
        console.log(t)
      }
    })

    app.util.request({
      url: "https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=statistic&do=save",
      method: "post",
      data: {
        articleId: id
      },
      success: (t) => {
        console.log(t)
      }
    })  

    if (options.uid) {
      app.util.request({
        url: "https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=inviter&do=save",
        method: "post",
        data: {
          uid: uid
        },
        success: (t) => {
          console.log(t)
        }
      })
    } else {
      // wx.showModal({
      //   title: '您还未登录',
      //   content: '',
      //   cancelText:'取消',
      //   confirmText:'登录',
      //   success(res){
      //     if(res.cancel){
      //       // 用户点击了取消属性的按钮，
      //       wx.navigateTo({
      //         url: '/pages/login/login',
      //       })
      //     }else if(res.confirm){
      //       wx.navigateTo({
      //         url: '/pages/login/login',
      //       })
      //     }
      //   }
      // })
    }

    this.setData({
      optionsid:options.id,
      optionsuid:options.uid,
    })
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=article&do=detail&id=' + id,
      success: (t) => {
        this.setData({
          res: t.data.payload.article
        })
      }
    })
    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=article&type=1&categoryId=' + uid,
      success: (t) => {
        console.log(t)
        this.setData({
          content: t.data.payload.articles
        })
      }
    })
    console.log("id",id,"uid",uid)
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
    let path = "/pages/detail/detail?id=" + this.data.shareid + "&uid=" + wx.getStorageSync('userInfo').memberInfo.uid;
    this.setData({
      shareid: this.data.res.id
    })
    return {
      title: this.data.sharetitle,
      path: path,
      imageUrl: this.data.sharethumburl
    }
  }
})