

<template>
  <div class="page page-with-padding">
    <div style="width: 100%; height: 300px">拍照</div>
    <!-- <wv-button @click.native="photo" type="primary">拍照</wv-button> -->
  </div>
</template>

<script>
// weixin.js
import wx from 'weixin-js-sdk' // 微信sdk依赖
// import { request } from './index'  //封装的asiox接口
var url = window.location.href.split('#')[0] //url不能写死
console.log(url,'34')

export default {
  created(){
    this.$http.post('/wechat/getConfig', {url: url}).then((resp) => {
      let wxConf = resp.data
      wx.config({
        debug: true,
        appId: wxConf.appId,
        timestamp: wxConf.timestamp,
        nonceStr: wxConf.nonceStr,
        signature: wxConf.signature,
        jsApiList: wxConf.jsApiList
      })

      // 分享给朋友
      wx.ready(function () {
        wx.updateAppMessageShareData({
          title: 'Cat cafe', // 分享标题
          desc: '以猫咪为主题的咖啡馆！', // 分享描述
          link: 'http://xxx.natapp1.cc/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://prp6xvxc1.bkt.clouddn.com/1.jpg', // 分享图标
          success: function (res) {
            // 设置成功
            // alert(JSON.stringify(res))
          }
        })

        // 分享到朋友圈
        wx.updateTimelineShareData({
          title: 'Cat cafe!!', // 分享标题
          link: 'http://xxx.natapp1.cc/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://prp6xvxc1.bkt.clouddn.com/1.jpg', // 分享图标
          success: function (res) {
            // 设置成功
            console.log('5555')
            console.log(JSON.stringify(res))
          }
        })

        wx.error(function (res) {
          alert(JSON.stringify(res))
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })
      })
    })
  }
}
</script>
<style>
</style>
