// pages/evaluate/evaluate.js
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

   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取用户云数据的缓存
    const db = wx.cloud.database()
    db.collection('user').doc(app.globalData.openid).get({
      success(res) {//用户已登录过
        if (res.data.MBTI !== undefined){
          wx.setStorageSync('MBTI', res.data.MBTI)
          wx.setStorageSync('JOB', res.data.JOB)
          wx.setStorageSync('date', res.data.date)
        } 
        if (res.data.WORK !== undefined){
          wx.setStorageSync('WORK', res.data.WORK)
          wx.setStorageSync('ABILITY', res.data.ABILITY)
        }
        if (res.data.power !== undefined){
          wx.setStorageSync('POWER', res.data.power)
          wx.setStorageSync('NUM0', res.data.num0)
          wx.setStorageSync('NUM1', res.data.num1)
          wx.setStorageSync('NUM2', res.data.num2)
          wx.setStorageSync('NUM3', res.data.num3)
          wx.setStorageSync('NUM4', res.data.num4)
          wx.setStorageSync('NUM5', res.data.num5)
        }
      },
      fail(err) {//用户未登录过，插入新增用户
        db.collection('user').add({
          data: {
            _id: app.globalData.openid
          }
        })
      }
    })
  }
})