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


const Router = require('koa-router')
const router = new Router()
const crypto = require('crypto')


const config = {
    wechat: {
        appID: 'wx7c313875d0b2b98f',
        appsecret: 'c8bf6186a425d43e800e9f4d113a70ce',
        token: '1234',
    }
}
router.get('/forwx',async ctx => {
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