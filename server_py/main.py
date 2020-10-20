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



from gevent import pywsgi
WECHAT_TOKEN = "1234"
from flask import Flask,request,abort
import hashlib
import xmltodict
import time
app = Flask(__name__)
@app.route("/chat",methods = ["GET","POST"])
def wechat():
    signature = request.args.get("signature")
    timestamp = request.args.get("timestamp")
    nonce = request.args.get("nonce")
    print(nonce,'aaa')
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
            print(xml_str)
            if not xml_str:
                abort(400)
            xml_dict = xmltodict.pasre(xml_str)
            xml_dict = xml_dict.get("xml")
            msg_type = xml_dict.get("MsgType")
            print(msg_type)


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
    #server = pywsgi.WSGIServer(('0.0.0.0',3005),app)
    #server.serveOA_forever()


"""
# -*- coding:utf-8 -*-    #中文编码
import sys
#reload(sys) # 不加这部分处理中文还是会出问题
import imp
imp.reload(sys)

#sys.setdefaultencoding('utf-8')
import time
from flask import Flask, request, make_response
import hashlib
import json
import xml.etree.ElementTree as ET
from dispatcher import *
app = Flask(__name__)
app.debug = True
@app.route('/') # 默认网址
def index():
 return 'Index Page'
@app.route('/chat', methods=['GET', 'POST'])
def wechat_auth(): # 处理微信请求的处理函数，get方法用于认证，post方法取得微信转发的数据
 if request.method == 'GET':
     token = '1234'
     data = request.args
     signature = data.get('signature', '')
     timestamp = data.get('timestamp', '')
     nonce = data.get('nonce', '')
     echostr = data.get('echostr', '')
     s = [timestamp, nonce, token]
     s.sort()
     s = ''.join(s)
 if (hashlib.sha1(s).hexdigest() == signature):
  return make_response(echostr)
 else:
     rec = request.stream.read() # 接收消息
     dispatcher = MsgDispatcher(rec)
     data = dispatcher.dispatch()
 with open("./debug.log", "a") as file:
  file.write(data)
  file.close()
 response = make_response(data)
 response.content_type = 'application/xml'
 return response
if __name__ == '__main__':
 app.run(host="0.0.0.0", port=3005)
 """
