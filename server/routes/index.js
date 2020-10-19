const Router = require('koa-router')
// const router = new Router()
const wxRouter = require('./wxRouter.js')

// router.use('/wechat/getConfig',)

wxRouter.use('/',wxRouter.routes(),wxRouter.allowedMethods())

module.exports = wxRouter
