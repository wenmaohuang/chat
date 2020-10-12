// components/Swiper2/Swiper2.js
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    titles: ["Yellow", "Orange", "Green", "Blue", "Purple"],
// 定义选中标题的初始值0
selectedTitle: "0",

  },

  /**
   * Component methods
   */
  methods: {
    bindtap: function (e) {
      console.log(e)
      this.setData({
      selectedTitle: e.currentTarget.id
      });
      },
      //定义滑块改变的事件处理函数，将current赋值给selectedTitle
      bindChange: function (e) {
      this.setData({
      selectedTitle: e.detail.current
      })
      },
      onReady: function () {
      // 页面渲染完成
      var that = this;
      wx.getSystemInfo({
      success: function (res) {
      that.setData({
      swiperHeight: (res.windowHeight - 37)
      });
      }
      })
      }
  }
})
