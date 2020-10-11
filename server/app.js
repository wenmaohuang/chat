const Koa = require('koa')
const cors = require('koa2-cors')
const Router = require('koa-router')
const crypto = require('crypto')
const wxServer = require('./routes/wxRouter')


const app = new Koa()


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



// 装载所有路由
const router = new Router()
router.use('/forwx', wxServer.routes(), wxServer.allowedMethods())
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(3005)
console.log('[demo] start-quick is starting at port 3005')