// pages/test/test.js
var mbti = require('../../data-mbti/mbti.js')

var numOfAll = 28  //题目总数

function ques_id(i) {//获取MBTI问题的index
  if (i < 26) {
     return i + 1
  }else {
     return 27 
  }
}

Page({

  data: {
    id: 0,
    qid: 0,
    numOfAll: numOfAll,
    question: mbti.mbti_question,
    ans: mbti.mbti_ans,
    boolReturn: false,
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
  },

  //选择了一个答案，触发：
  on_ans: function (envent) {
    console.log(envent.currentTarget.dataset)
    var old_id = envent.currentTarget.dataset.id
    var bool = envent.currentTarget.dataset.bool
    var id = old_id + 1
    var qid = ques_id(old_id)
    this.setData({ id: id })
    this.setData({ qid: qid })
    this.setData({ boolReturn: true })
    //根据所选选项更改对应E、I、S、N、T、F、J、P的值，每次加1
    var rule = mbti.mbti[old_id]
    var theDem = rule.type;
    if ((bool == true)) {
      switch (theDem) {
        case "E":
          var temp = this.data.E + 1
          this.setData({ E: temp })
          break
        case "N":
          var temp = this.data.N + 1
          this.setData({ N: temp })
          break
        case "F":
          var temp = this.data.F + 1
          this.setData({ F: temp })
          break
        case "J":
          var temp = this.data.J + 1
          this.setData({ J: temp })
          break
        default:
          console.log("no mbti switch")
      }
    }else {
      switch (theDem) {
        case 'E':
          var temp = this.data.I + 1
          this.setData({ I: temp })
          break
        case "N":
          var temp = this.data.S + 1
          this.setData({ S: temp })
          break
        case "F":
          var temp = this.data.T + 1
          this.setData({ T: temp })
          break
        case "J":
          var temp = this.data.P + 1
          this.setData({ P: temp })
          break
        default:
          console.log("no mbti switch")
      }
    }
    console.log(temp)
    //更新新旧E、I、S、N、T、F、J、P的缓存
    var tempSto = wx.getStorageSync('eight')
    wx.setStorageSync('oldeight', tempSto)
    wx.setStorageSync('eight', {
      E: this.data.E, I: this.data.I, S: this.data.S, N: this.data.N,
      T: this.data.T, F: this.data.F, J: this.data.J, P: this.data.P,
    })
    //如果做完了numOfAll道题，那么判断MBTI类型：
    if (old_id >= numOfAll - 1) { this.jud() }
  },

  //判断MBTI类型：
  jud: function () {
    var rE = this.data.E
    var rI = this.data.I
    var rS = this.data.S
    var rN = this.data.N
    var rT = this.data.T
    var rF = this.data.F
    var rJ = this.data.J
    var rP = this.data.P
    var rEI = (rE) / (rE + rI)
    var rSN = (rS) / (rS + rN)
    var rTF = (rT) / (rT + rF)
    var rJP = (rJ) / (rJ + rP)
    console.log(rEI); console.log(rSN); console.log(rTF); console.log(rJP);
    var result = ""
    var res1 = rEI > 0.5 ? "E" : "I"
    var res2 = rSN > 0.5 ? "S" : "N"
    var res3 = rTF > 0.5 ? "T" : "F"
    var res4 = rJP > 0.5 ? "J" : "P"
    result = res1 + res2 + res3 + res4
    wx.setStorageSync('MBTI', result)
    wx.reLaunch({
      url: '../result/result'
    })
  },

  //重做上一题：
  on_return: function (envent) {
    var old_id = envent.currentTarget.dataset.id
    var id = old_id - 1
    var id2 = old_id - 2
    this.setData({ qid: ques_id(id2) })
    this.setData({ id: id })
    this.setData({ boolReturn: false })
    var tempSto = wx.getStorageSync('oldeight')
    wx.setStorageSync('eight', tempSto)
    this.setData({ E: tempSto.E }); this.setData({ I: tempSto.I })
    this.setData({ S: tempSto.S }); this.setData({ N: tempSto.N })
    this.setData({ T: tempSto.T }); this.setData({ F: tempSto.F })
    this.setData({ J: tempSto.J }); this.setData({ P: tempSto.P })
  },

  onLoad: function (options) {
    wx.setStorageSync('eight', {
      E: 0, I: 0, S: 0, N: 0,
      T: 0, F: 0, J: 0, P: 0,
    })
    wx.setStorageSync('oldeight', {
      E: 0, I: 0, S: 0, N: 0,
      T: 0, F: 0, J: 0, P: 0,
    })
  },

  goToEvaluate:function(){
    wx.reLaunch({
      url: '../evaluate/evaluate'
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {
    wx.removeStorageSync('eight')
    wx.removeStorageSync('oldeight')
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