// components/ScrollView/ScrollView.js


var order = ['red', 'yellow', 'blue', 'green', 'red']
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
    toView: 'red',
    scrollTop: 100
  },
  methods:{
    upper: function(e) {
      console.log(e)
    },
    lower: function(e) {
      console.log(e)
    },
    scroll: function(e) {
      console.log(e)
    },
    tap: function(e) {
      for (var i = 0; i < order.length; ++i) {
        if (order[i] === this.data.toView) {
          this.setData({
            toView: order[i + 1]
          })
          break
        }
      }
    },
    tapMove: function(e) {
      this.setData({
        scrollTop: this.data.scrollTop + 10
      })
    }
  }
})
