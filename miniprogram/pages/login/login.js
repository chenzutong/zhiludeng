// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  onLoad: function () {
    
  },
  bindGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      console.log(e.detail.userInfo)
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          console.log(app)
          app.globalData.openid = res.result.openid
          wx.switchTab({
            url: '../evaluate/evaluate'
          })  
        }
      })
      }
      
      
      
    
  },


})