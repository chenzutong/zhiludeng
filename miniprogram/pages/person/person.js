// pages/person/person.js
Page({

  goToTest: function () {
    wx.navigateTo({
      url: '../explain/explain',
    })
  },

  goToResult:function(){
    wx.navigateTo({
      url: '../result/result',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    isDone: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nowDate = wx.getStorageSync('date')
    this.setData({ nowDate: nowDate})

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    //判断是否测试过，若测试过，获取相应的测试结果信息
    var work = wx.getStorageSync('WORK')
    var job = wx.getStorageSync('JOB')
    var MBTI = wx.getStorageSync('MBTI')
    if (this.data.isDone == false) {
      if (job == undefined || job == '') {
        return;
      }else {
        this.setData({ isDone: true})
        this.setData({ work: work })
        this.setData({ MBTI: MBTI })
      }
    }

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