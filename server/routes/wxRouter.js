
const Router = require('koa-router')
const crypto = require('crypto')


// 微信配置
const config = {
    wechat: {
        appID: 'wx41bd6458d661750b',
        appsecret: 'd5417464fb40500104b6e7224530fb6c',
        token: '1234'
    }
}
// 给微信验证的
const wxServer = new Router()
wxServer.get('/', async ctx => {
    const { signature, timestamp, nonce, echostr } = ctx.request.query
    console.log(signature,timestamp, nonce, echostr,ctx.request.query.nonce,'nh')

    const token = config.wechat.token
    let hash = crypto.createHash('sha1')
    const arr = [token, timestamp, nonce].sort()
    hash.update(arr.join(''))
    const shasum = hash.digest('hex')
    if (shasum === signature) {
        return (ctx.body = echostr)
    }
    ctx.status = 401
    ctx.body = 'Invalid signature'
})

module.exports = wxServer