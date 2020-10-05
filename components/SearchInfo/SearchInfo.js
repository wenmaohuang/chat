// components/SearchInfo/SearchInfo.js
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

  },

  /**
   * Component methods
   */
  methods: {
    handleFetch (e) {
      console.log(e.detail.value,'sa')
      // fetch("http://localhost:3001/search?word=" + e.detail.value)
      //     .then(res => res.json())
      //     .then(msg => {
             
      //     });

      wx.request({

        url: "https://test.fyyd.vip:3102/search?word=" + e.detail.value,
        // url:'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
        method: 'POST',

        dataType: 'STRING',

        data: 'this is  post  string data',

        header: { 'content-type': 'application/x-www-form-urlencoded' },

        success: function (res) {

          console.log('this is  post request result' + res.data)

        }

      })
  }
  }
})
