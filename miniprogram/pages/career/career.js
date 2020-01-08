// pages/career/career.js
const app = getApp()
Page({
  goToTest: function () {
    wx.navigateTo({
      url: '../explain/explain',
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
      

    //判断是否测试过
    var work = wx.getStorageSync('WORK')
    this.setData({ work: work })
    if (this.data.isDone == false) {
      if (work == undefined || work == '') {
        return;
      }else {
        this.setData({isDone: true})
      }
    }

    //从云数据中获取改职位的能力要求，并缓存
    var that = this
    const db = wx.cloud.database()
    db.collection('job').doc(work).get({
      success(res) {
        console.log(res.data)
        that.setData({ responsibilities: res.data.responsibilities })
        that.setData({ requirements: res.data.requirements })
        wx.setStorageSync('ABILITY', res.data.ability)

        
        db.collection('user').doc(app.globalData.openid).update({
          data: {
            WORK: work,
            ABILITY: res.data.ability
          }
        })
      }
    })
  }
})