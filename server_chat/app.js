const express = require('express')
const path = require('path')
const auth = require('./weChat/auth')

const app = express()
app.use(express.static(path.join(__dirname, './public')))

app.use('/chat',auth())


app.listen(3005,()=> console.log('服务器启动成功'))