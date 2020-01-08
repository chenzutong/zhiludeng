


Page({
  goToTest: function () {
    wx.navigateTo({
      url: '../explain/explain',
    })
  },
  goToUpdate_ability: function () {
    wx.navigateTo({
      url: '../update_ability/update_ability',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    isDone: false,
    isPower: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //判断是否测评
    var work = wx.getStorageSync('WORK')
    this.setData({ work: work })
    if (this.data.isDone == false) {
      if (work == undefined || work == '') {
        return;
      }else {
        this.setData({isDone: true})
      }
    }

    //判断是否填写过能力
    var power = wx.getStorageSync('POWER')
    this.setData({ power: power })
    if (this.data.isPower == false) {
      if (power == undefined || power == '') {
        return;
      }else {
        this.setData({isPower: true})
      }
    }

    
    //获取【能力填写】的slider的值
    var num0 =wx.getStorageSync('NUM0')
    this.setData({num0:num0})
    var num1 = wx.getStorageSync('NUM1')
    this.setData({ num1: num1 })
    var num2 = wx.getStorageSync('NUM2')
    this.setData({ num2: num2 })
    var num3 = wx.getStorageSync('NUM3')
    this.setData({ num3: num3 })
    var num4 = wx.getStorageSync('NUM4')
    this.setData({ num4: num4 })
    console.log(power.length)
    var num5 = wx.getStorageSync('NUM5')
    this.setData({ num5: num5 })
    console.log(power.length)

    //对应的值对于的图片显示
    this.setData({ images0: "../../images/" + num0 + ".png"})
    this.setData({ images1: "../../images/" + num1 + ".png" })
    this.setData({ images2: "../../images/" + num2 + ".png" })
    this.setData({ images3: "../../images/" + num3 + ".png" })
    this.setData({ images4: "../../images/" + num4 + ".png" })
    this.setData({ images5: "../../images/" + num5 + ".png" })

    //算出匹配度
    var sum = num0 + num1 + num2 + num3 + num4 + num5
    var matching = sum/(power.length*5)
    matching = parseFloat(matching).toFixed(2)
    matching = matching*100
    var lack = 100 - matching
    this.setData({ matching: matching})
    this.setData({ lack: lack })
  }
})