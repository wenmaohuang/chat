# -*- coding: utf-8 -*-
# filename: main.py


from gevent import pywsgi
WECHAT_TOKEN = "1234"
from flask import Flask,request,abort
import hashlib
import xmltodict
import time
app = Flask(__name__,
            static_folder='static'
)

print(app.instance_path,'bb')

@app.route("/chat/",methods = ["GET","POST"])
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
    sign = hashlib.sha1(tem_str.encode("utf-8")).hexdigest()
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
            xml_dict = xmltodict.parse(xml_str)
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


