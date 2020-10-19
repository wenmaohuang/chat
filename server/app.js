const Koa = require('koa')
const cors = require('koa2-cors')
const Router = require('koa-router')
const crypto = require('crypto')
const wxServer = require('./routes/wxRouter')
const staticFiles = require('koa-static')
const path = require('path')


const app = new Koa()


// 使用koa2-cors解决跨域问题
app.use(
    cors({
        origin: ctx => {
            if (ctx.url === '/test') {
                return false
            }
            return ctx.headers.origin || '*'
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    })
)

// app.use(require('koa-static')(__dirname, './public'));
// app.use(staticFiles(__dirname + '/public'))
app.use(staticFiles(path.resolve(__dirname + './../client_gzh/dist')))
console.log(path.resolve(__dirname +'./..' + '/client_gzh/dist'))
console.log('public')
app.use(staticFiles(path.resolve(__dirname + 'public')))


const wxRouter = require('./routes/index.js')
// const router = new Router()
wxRouter.use('/',wxRouter.routes(),wxRouter.allowedMethods())

app.use(wxRouter.routes(),wxRouter.allowedMethods())

// const router = new Router();
// const config = {
//     wechat: {
//         appID: 'wx7c313875d0b2b98f',
//         appsecret: 'c8bf6186a425d43e800e9f4d113a70ce',
//         token: '1234',
//     }
// }
//
//
// router.use(async ctx => {
//     const { signature, timestamp, nonce, echostr } = ctx.query
//
//     console.log(ctx.query,'ex')
//
//
//     const token = config.wechat.token
//     let hash = crypto.createHash('sha1')
//     const arr = [token, timestamp, nonce].sort()
//     hash.update(arr.join(''))
//     const shasum = hash.digest('hex')
//     if(shasum === signature){
//         return ctx.body = echostr
//     }
//     ctx.status = 401
//     ctx.body = 'Invalid signature'
// })



// 装载所有路由
// const router = new Router()
// router.use('/forwx', wxServer.routes(), wxServer.allowedMethods())
// // 加载路由中间件
// app.use(router.routes()).use(router.allowedMethods())
app.listen(3005)
console.log('[demo] start-quick is starting at port 3005')