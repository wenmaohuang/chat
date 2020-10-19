import axios from 'axios'
import wx from 'weixin-js-sdk'

const wxshare = {
  do(queryId, icon = '', title = '', desc = '') {
    const url = location.href.split('#')[0] // ruoter是hash模式的时候 获取锚点之前的链接
    console.log('前端传输前的url地址', location.href)
    console.log('前端传输前的url地址', url)
    axios.post('https:/..../getsignature', { // 服务端获取配置jssdk 签名等 文件

      urlhref: url

    }).then(response => {
      const res = response.data
      console.log('调用微信js接口返回的签名：', res)

      this.wxInit(res, queryId, icon, title, desc)
    })
  },
  // 微信分享
  wxInit(res, queryId, icon = '', title = '', desc = '') {
    const url = location.href.split('#')[0] // 获取锚点之前的链接

    // let links = url+'#/Food/' + this.$route.params.id;    //用于签名的url 和 用于微信分享的url可以不同
    // const links = url + '#/?jsonurl=' + queryId

    const links = url

    console.log('url link:', links)

    wx.config({
      debug: false,
      appId: res.appID,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      signature: res.signature,
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
    })
    wx.ready(function() {
      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: icon, // 分享图标
        success: function() {
          // 设置成功
          console.log('设置成功')
        }
      })
      // 微信分享菜单测试
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: icon, // 分享图标
        success: function() {
          // 设置成功
          console.log('设置成功')
        }
      })
    })
    wx.error(function(err) {
      alert(JSON.stringify(err))
    })
  }
}

export default wxshare

