const sha1 = require('sha1')
const config = require('../config/')
const {getUserDataAsync, parseXMLAsync, formatMessage} = require('../utils/tool')

module.exports = () => {

    return async (req, res, next) => {
        const {signature, echostr, timestamp, nonce} = req.query
        const {token} = config
        // const arr = [timestamp,nonce,token]
        // const arrSort =arr.sort()
        // const str = arr.join('')
        // const sha1Str = sha1(str)

        const sha1Str = sha1([timestamp, nonce, token].sort().join(''))


        // if(sha1Str === signature){
        //     res.send(echostr)
        // }else{
        //     res.send('error')
        // }


        if (req.method === 'GET') {

            if (sha1Str === signature) {
                res.send(echostr)
            } else {
                res.end('error')
            }


        } else if (req.method === 'POST') {

            if (sha1Str !== signature) {
                res.end('err')
            }
            const xmlData = await getUserDataAsync(req)
            console.log(xmlData)

            const jsData = await parseXMLAsync(xmlData)
            console.log(jsData)
            const message = formatMessage(jsData)
            console.log(message)
            let content = '你说什么,我听不懂?'
            if (message.MsgType === 'text') {
                if (message.Content === '1') {
                    content = '大吉大利'
                } else if (message.Content === '2') {
                    content = '落地成盒'
                } else if (message.Content.match('爱')) {
                    content = '我爱你~'
                }
            }


            let replyMessage = `<xml>
                                  <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                                  <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                                  <CreateTime>${Date.now()}</CreateTime>
                                  <MsgType><![CDATA[text]]></MsgType>
                                  <Content><![CDATA[${content}]]></Content>
                                </xml>`

            res.send(replyMessage)
            // res.end('')


            // if(sha1Str === signature){
            //     // res.send(echostr)
            //     const xmlData = await getUserDataAsync(req)
            //     console.log(xmlData)
            //
            //
            // }else{
            //     res.end('')
            // }


        } else {
            res.end('error')

        }

    }
}