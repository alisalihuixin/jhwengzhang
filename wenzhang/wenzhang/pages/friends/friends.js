Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  copyText:function(e){
    wx.setClipboardData({
      data:this.data.detail.brief,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  onLoad: function (options) {
    let userinfo = wx.getStorageSync('userInfo')
    if (!userinfo) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
    console.log(options)

    wx.request({
      url: 'https://suoke.syjuhui.com/app/index.php?i=5&c=juhuiwenzhang&a=util&do=getQrcode&id=' + options.id + '&uid=' + options.uid,
      success: (t) => {
        console.log(t)
        this.setData({
          qrcode: t.data.payload.qrcode
        })
      }
    })

    this.setData({
      detail: {
        name: wx.getStorageSync('userInfo').memberInfo.nickname,
        avatar: wx.getStorageSync('userInfo').memberInfo.avatar,
        title: wx.getStorageSync('title'),
        brief: wx.getStorageSync('brief')
      }
    })
  },


  save: function () {
    wx.getSetting({

      success: res => {
        if (!res.authSetting['scope.writePhotosAlbum']) { //未授权的话发起授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => { //用户授权保存到相册
              this.saveImg()
            },
            fail: () => {
              wx.openSetting({
                success: () => {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: () => {
                      this.saveImg()
                    }

                  })
                },
              })
            }
          })
        } else { //已经授权
          this.saveImg()
        }
      }
    })
  },
  saveImg() {
    let url = this.data.qrcode;
    wx.downloadFile({
      url: url,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: (err) => {
            console.log('失败！！')
          }
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