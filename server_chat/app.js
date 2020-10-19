const express = require('express')
const auth = require('./weChat/auth')

const app = express()
app.use(express.static(path.join(__dirname, './chat')))

app.use(auth())


app.listen(3005,()=> console.log('服务器启动成功'))