# -*- coding: utf-8 -*-
# filename: main.py



"""from handle import Handle

import web

urls = (
    '/wechat/g:q
    :etConfig', 'Handle',
)

class Handle(object):
    def GET(self):
        return "hello, this is handle view"

if __name__ == '__main__':
    app = web.application(urls, globals())
    app.run()

    """
print('add .')
import falcon
from falcon import uri
from wechatpy.utils import check_signature
from wechatpy.exceptions import InvalidSignatureException
from wechatpy import parse_message
from wechatpy .replies import TextReply,ImageReply

class Connect(object):
    def on_get(self,req, resp):
        query_string = req.query_string
        query_list = query_string.split('&')
        b = {}
        for i in query_list:
            b[i.split('=')[0]] = i.split('=')[1]
        try:
            check_signature(token='这里填写配置界面你输入的token', signature=b[ 'signature'],timestamp=b['timestamp'], nonce=b['nonce'])
            resp.body = (b['echostr'])
        except InvalidsignatureException:
            pass
        resp.status = falcon.HTTP_200
    def on_post(self,req,resp):
        xml = req.stream.read()
        msg= parse_message (xml)
        if msg.type == 'text':
            reply = TextReply(content=msg.content, message=msg)
            xml = reply.render()
            resp.body = (xml)
            resp.status = falcon.HTTP_200
app = falcon.API()
connect = Connect()
app.add_route('/wechat/getConfig', connect)



