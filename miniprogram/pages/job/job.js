// pages/job/job.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取选择的职位名称，并从云数据中查看相应的信息
    var work = wx.getStorageSync('WORK')
    this.setData({ work: work })
    console.log(work)
    var that = this
    const db = wx.cloud.database()
    db.collection('job').doc(work).get({
      success(res) {
        console.log(res.data)
        that.setData({ responsibilities: res.data.responsibilities})
        that.setData({ requirements: res.data.requirements})
      }
    })
  },

  //移除【填写能力】的缓存
  goToCareer: function(){
    wx.removeStorageSync('POWER')
    wx.removeStorageSync('NUM0')
    wx.removeStorageSync('NUM1')
    wx.removeStorageSync('NUM2')
    wx.removeStorageSync('NUM3')
    wx.removeStorageSync('NUM4')
    wx.removeStorageSync('NUM5')
    wx.reLaunch({
      url:'../career/career'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

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