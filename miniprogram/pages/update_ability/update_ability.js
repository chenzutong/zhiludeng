// miniprogram/pages/update_ability/update_ability.
const app = getApp()
Page({

  //获取每个slider的最终值，并且缓存
  sliderBindchange0: function (e) {
    console.log(e.detail.value)
    var num = e.detail.value
    wx.setStorageSync('NUM0', num)
  },
  sliderBindchange1: function (e) {
    console.log(e.detail.value)
    var num = e.detail.value
    wx.setStorageSync('NUM1', num)
  },
  sliderBindchange2: function (e) {
    console.log(e.detail.value)
    var num = e.detail.value
    wx.setStorageSync('NUM2', num)
  },
  sliderBindchange3: function (e) {
    console.log(e.detail.value)
    var num = e.detail.value
    wx.setStorageSync('NUM3', num)
  }, 
  sliderBindchange4: function (e) {
    console.log(e.detail.value)
    var num = e.detail.value
    wx.setStorageSync('NUM4', num)
  }, 
  sliderBindchange5: function (e) {
    console.log(e.detail.value)
    var num = e.detail.value
    wx.setStorageSync('NUM5', num)
  },

  goToAbility: function () {
    var num0 = wx.getStorageSync("NUM0")
    var num1 = wx.getStorageSync("NUM1")
    var num2 = wx.getStorageSync("NUM2")
    var num3 = wx.getStorageSync("NUM3")
    var num4 = wx.getStorageSync("NUM4")
    var num5 = wx.getStorageSync("NUM5")
    var power = wx.getStorageSync('POWER')
    const db = wx.cloud.database()
    db.collection('user').doc(app.globalData.openid).update({
      data: {
        num0: num0,
        num1: num1,
        num2: num2,
        num3: num3,
        num4: num4,
        num5:num5,
        power:power
      }
    })

    wx.reLaunch({
      url: '../ability/ability',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    ability:'abi01',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //从云数据中查看职位相应的能力信息
    var ability = wx.getStorageSync('ABILITY')
    this.setData({ ability: ability })
    console.log(ability)
    var that = this
    const db = wx.cloud.database()
    var index = 0;
    wx.removeStorageSync('POWER')
    for(var i = 0;i<ability.length;i++){
      db.collection('ability').doc(ability[index]).get({
        success(res) {
          console.log(res.data)  
          var pow = res.data.abi
          var power = wx.getStorageSync('POWER') || []
          power.unshift(pow)
          wx.setStorageSync('POWER', power)
          that.setData({ power: power })
        }
      })
      var index = index + 1;
    }


    //slider的初始值
    var mun0 = wx.getStorageSync("NUM0")
    if (mun0 == undefined || mun0 == '') {
      return;
    }else {
      this.setData({
        sliderValue0: mun0 
      })
    }
    var mun1 = wx.getStorageSync("NUM1")
    if (mun1 == undefined || mun1 == '') {
      return;
    } else {
      this.setData({
        sliderValue1: mun1
      })
    }
    var mun2 = wx.getStorageSync("NUM2")
    if (mun2 == undefined || mun2 == '') {
      return;
    } else {
      this.setData({
        sliderValue2: mun2
      })
    }
    var mun3 = wx.getStorageSync("NUM3")
    if (mun3 == undefined || mun3 == '') {
      return;
    } else {
      this.setData({
        sliderValue3: mun3
      })
    }
    var mun4 = wx.getStorageSync("NUM4")
    if (mun4 == undefined || mun4 == '') {
      return;
    } else {
      this.setData({
        sliderValue4: mun4
      })
    }
    var mun5 = wx.getStorageSync("NUM5")
    if (mun5 == undefined || mun5 == '') {
      return;
    } else {
      this.setData({
        sliderValue5: mun5
      })
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