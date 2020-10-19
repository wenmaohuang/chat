//
// const Router = require('koa-router')
// const crypto = require('crypto')
// const superagent = require('superagent')
//
//
// // 微信配置
// const config = {
//     wechat: {
//         appID: 'wx7c313875d0b2b98f',
//         appsecret: '8193164c9e567a3365ddf8b0b9903468',
//         token: '1234'
//     }
// }
// // 给微信验证的
// const wxServer = new Router()
//
// const appid = "wx41bd6458d661750b"  // appid
// const appsecret = "49e55a1348cd9a1ea08e790450e172c1"  // appsecret
//
// wxServer.get("/", async(ctx, next) => {
//     let ACCESS_TOKEN = "38_WTtdXusOkN7VeCXqOvoUp16q20DdRuu2S6xytjltjScvl1i3dIjjHhNr4_3FvHFXYhaWIjkbBaxlT_WhutQpk6M2c08Z_WxpsmF3tKAt5PEWRz-qyGRLJBeywoO2LyHH6UwL3AQfz7J9rUPWSMMcAFAYSS",
//         openid = "";
//     console.log(ctx,'cd')
//
//     // 使用code获取openid和access_token
//     await superagent
//         .get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=" +
//             appid + "&secret=" +
//             appsecret + "&code=" +
//             ctx.query.code + "&grant_type=authorization_code")
//         .then(res => {
//             // 此处本来应该用res.body获取返回的json数据，但总是获取不到，只能用text代替
//             let result = JSON.parse(res.text)
//             console.log(res.body,'de')
//
//             ACCESS_TOKEN = result.access_token
//             openid = result.openid
//         })
//         .catch(res => {
//             console.log(res)
//         })
//
//     // 使用ACCESS_TOKEN和openid
//     await superagent
//         .get("https://api.weixin.qq.com/sns/userinfo?access_token=" +
//             access_token + "&openid=" + openid + "&lang=zh_CN")
//         .then(res => {
//             console.log(JSON.parse(res.text))
//             ctx.body = {
//                 state: 1,
//                 msg: '获取access_token成功！'
//             }
//         })
//         .catch(res => {
//             console.log(res)
//         })
// })
//
//
// // wxServer.get('/', async ctx => {
// //     const { signature, timestamp, nonce, echostr } = ctx.request.query
// //     console.log(signature,timestamp, nonce, echostr,ctx.request,'nh')
// //
// //     const token = config.wechat.token
// //     let hash = crypto.createHash('sha1')
// //     const arr = [token, timestamp, nonce].sort()
// //     hash.update(arr.join(''))
// //     const shasum = hash.digest('hex')
// //     if (shasum === signature) {
// //         return (ctx.body = echostr)
// //     }
// //
// //     ctx.status = 401
// //     ctx.body = 'Invalid signature'
// // })
//
//
//
//
//
// module.exports = wxServer

//
const Router = require('koa-router')
const router = new Router()
const crypto = require('crypto')


const config = {
    wechat: {
        appID: 'wx7c313875d0b2b98f',
        appsecret: '8f6d13749d57ab0e10c603cf49b36bbe',
        token: '1234',
    }
}
router.get('/',async ctx => {
    const { signature, timestamp, nonce, echostr } = ctx.query

    console.log(ctx.query,'ex')


    const token = config.wechat.token
    let hash = crypto.createHash('sha1')
    const arr = [token, timestamp, nonce].sort()
    hash.update(arr.join(''))
    const shasum = hash.digest('hex')
    if(shasum === signature){
        return ctx.body = echostr
    }
    ctx.status = 401
    ctx.body = 'Invalid signature'
})

module.exports = router



// const router = require('koa-router')()
// // 引入统一下单的api
// // const config = require('../module/config')
// const config = {
//     // mch_id: '153506xxxxx', //商户号（非支付可不填）
//     wxappid: 'wx7c313875d0b2b98f', //AppID
//     wxappsecret: 'c8bf6186a425d43e800e9f4d113a70ce', //AppSecret
//     // wxpaykey: 'c23fdgas768fdhASdsad1xxxxxxxx'  // 商户key（支付API密钥，非支付可不填）
// }




// 用来生成签名、config的参数
// const API = require('wechat-api')
// const api = new API(config.wxappid, config.wxappsecret)
//
// router.post('/wechat/getConfig', async (ctx, next) => {
//     // 使用wechat-api获取JSconfig
//     var param = {
//         debug: false,
//         jsApiList: ['checkJsApi',
//             // 'onMenuShareTimeline',
//             // 'onMenuShareAppMessage',
//             'onMenuShareQQ',
//             'onMenuShareWeibo',
//             'onMenuShareQZone',
//             'hideMenuItems',
//             'showMenuItems',
//             'hideAllNonBaseMenuItem',
//             'showAllNonBaseMenuItem',
//             'translateVoice',
//             'startRecord',
//             'stopRecord',
//             'onVoiceRecordEnd',
//             'playVoice',
//             'onVoicePlayEnd',
//             'pauseVoice',
//             'stopVoice',
//             'uploadVoice',
//             'downloadVoice',
//             'chooseImage',
//             'previewImage',
//             'uploadImage',
//             'downloadImage',
//             'getNetworkType',
//             'openLocation',
//             'getLocation',
//             'hideOptionMenu',
//             'showOptionMenu',
//             'closeWindow',
//             'scanQRCode',
//             'chooseWXPay',
//             'openProductSpecificView',
//             'addCard',
//             'chooseCard',
//             'openCard',
//             'updateAppMessageShareData',
//             'updateTimelineShareData'],
//         url: ctx.request.body.url
//     }
//
//
//
//     //生成config的参数
//     api.getJsConfig(param, function (err, data) {
//         //  console.log(err)
//         ctx.body = { 'success': 'true', 'data': data, 'code': '200' }
//     })
// })
//
// module.exports = router