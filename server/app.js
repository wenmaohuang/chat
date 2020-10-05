const Koa = require('koa')
const cors = require('koa2-cors')
const Router = require('koa-router')
const crypto = require('crypto')
const app = new Koa()
// 微信配置
const config = {
wechat: {
appID: 'wx41bd6458d661750b',
appsecret: 'd5417464fb40500104b6e7224530fb6c',
token: '1234'
}
}
// 使用koa2-cors解决跨域问题
app.use(
cors({
origin: ctx => {
if (ctx.url === '/test') {
return false
}
return '*'
},
exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
maxAge: 5,
credentials: true,
allowMethods: ['GET', 'POST', 'DELETE'],
allowHeaders: ['Content-Type', 'Authorization', 'Accept']
})
)
// 给微信验证的
const wxServer = new Router()
wxServer.get('/', async ctx => {
const { signature, timestamp, nonce, echostr } = ctx.query
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
// 装载所有路由
const router = new Router()
router.use('/forWx', wxServer.routes(), wxServer.allowedMethods())
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(3005)
console.log('[demo] start-quick is starting at port 3005')