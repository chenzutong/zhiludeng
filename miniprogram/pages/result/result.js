// pages/result/result.js
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取当前时间，并缓存
    var nowDate = util.formatTime(new Date())
    wx.setStorageSync('date', nowDate)  

    //获取MBTI测试结果，并在云数据中查询相应的信息，显示在wxml中
    var mbtiRes = wx.getStorageSync('MBTI')
    this.setData({ mbtiRes: mbtiRes })
    var that = this
    const db = wx.cloud.database()
    db.collection('mbti').doc(mbtiRes).get({
      success(res) {
        that.setData({ description:res.data.description})
        that.setData({ industry:res.data.industry})
        that.setData({ representative:res.data.representative})
        that.setData({ type: res.data.type })
        that.setData({ job: res.data.job })
        var job = that.data.job
        wx.setStorageSync('JOB', job)

        //更新用户云数据信息
        db.collection('user').doc(app.globalData.openid).update({
          data: {
            MBTI: mbtiRes,
            date: nowDate,
            JOB: job
          }
        })
      } 
    })
    
    
    
  },
  
  //选择相应职位，缓存职位名称并跳转
  goToJob0: function () {
    var job = wx.getStorageSync('JOB')
    wx.setStorageSync('WORK', job[0])
    wx.navigateTo({
      url: '../job/job',
    })
  },
  goToJob1: function () {
    var job = wx.getStorageSync('JOB')
    wx.setStorageSync('WORK', job[1])
    wx.navigateTo({
      url: '../job/job',
    })
  },
  goToJob2: function () {
    var job = wx.getStorageSync('JOB')
    wx.setStorageSync('WORK', job[2])
    wx.navigateTo({
      url: '../job/job',
    })
  },
  goToJob3: function () {
    var job = wx.getStorageSync('JOB')
    wx.setStorageSync('WORK', job[3])
    wx.navigateTo({
      url: '../job/job',
    })
  },
  goToJob4: function () {
    var job = wx.getStorageSync('JOB')
    wx.setStorageSync('WORK', job[4])
    wx.navigateTo({
      url: '../job/job',
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