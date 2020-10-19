# -*- coding: utf-8 -*-
# filename: main.py

"""

from handle import Handle

import web

urls = (
    '/', 'Handle',
)

class Handle(object):
    def GET(self):
        return "hello, this is handle view"

if __name__ == '__main__':
    app = web.application(urls, globals())
    app.run()
"""


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
"""




WECHAT_TOKEN = "1234"
from flask import Flask,request,abort
import hashlib
import xmltodict
import time
app = Flask(__name__)
@app.route("/",methods = ["GET","POST"])
def wechat():
    signature = request.args.get("signature")
    timestamp = request.args.get("timestamp")
    nonce = request.args.get("nonce")
    if not all ([signature,timestamp,nonce]):
        abort(400)
    li = [WECHAT_TOKEN,timestamp,nonce]
    li.sort()
    tem_str = "".join(li)
    sign = hashlib.sha1(tem_str).hexdigest()
    if signature != sign:
        abort(403)
    else:
        if request.method == "GET":
            echostr = request.args.get("echostr")
            if not echostr:
                abort(400)
            return echostr
        elif request.method == "POST":
            xml_str = request.data
            if not xml_str:
                abort(400)
            xml_dict = xmltodict.pasre(xml_str)
            xml_dict = xml_dict.get("xml")
            msg_type = xml_dict.get("MsgType")
            if msg_type == "text":
                resp_dict = {
                "xml":{
                "ToUserName":xml_dict.get("FromUserName"),
                "FromUserName":xml_dict.get("ToUserName"),
                "CreateTime":int(time.time()),
                 "MsgType":"text",
                 "Content":xml_dict.get("Content")

                    }
                }
            else:
                resp_dict = {
                                "xml":{
                                "ToUserName":xml_dict.get("FromUserName"),
                                "FromUserName":xml_dict.get("ToUserName"),
                                "CreateTime":int(time.time()),
                                 "MsgType":"text",
                                 "Content":"i love you"

                                    }
                                }

            resp_xml_str = xmltodict.unparse(resp_dict)
            return resp_xml_str



if __name__ == '__main__':
    app.run(port=3005,debug=True)
