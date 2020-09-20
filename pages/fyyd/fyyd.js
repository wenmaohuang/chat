// pages/fyyd/fyyd.js
Page({

  /**
   * Page initial data
   */
  data: {
    pageAnimation:"mymove 0s"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },


  touchMove:function(e){
    var animation =  "mymove 5s"
    // this.data.pageAnimation = "mymove 5s"
    this.setData({
      pageAnimation:animation
    })

    wx.switchTab({
      url: '/pages/home/home'
    })

console.log(this,'e1')
    // var animation =  "mymove 0s"
    // // this.data.pageAnimation = "mymove 5s"
    // this.setData({
    //   pageAnimation:animation
    // })


    // ,
    // wx.showTabBar({
    //   animation:true
    // })
  }
})