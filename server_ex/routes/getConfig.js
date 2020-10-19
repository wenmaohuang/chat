var express = require('express');

var crypto = require('crypto')

var router = express.Router();

var sha1 = require('sha1');

var wxShare = require('./wxShare')

var token = "1234"

/* GET home page. */

router.get('/', function(req, res, next) {

    console.log();

    var signature = req.query.signature;

    var timestamp = req.query.timestamp;

    var nonce = req.query.nonce;

    var echostr = req.query.echostr;

    console.log(signature, timestamp, nonce, echostr);

    /* 加密/校验流程如下： */

    //1. 将token、timestamp、nonce三个参数进行字典序排序

    var array = new Array(token,timestamp,nonce);

    array.sort();

    var str = array.toString().replace(/,/g,"");

    //2. 将三个参数字符串拼接成一个字符串进行sha1加密

    var sha1Code = crypto.createHash("sha1");

    var code = sha1Code.update(str,'utf-8').digest("hex");

    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    console.log(code,'code')

    if(code===signature){

        res.send(echostr)

    }else{

        res.send("error");

    }

});

/**

 * 分享

 */

router.post('/signature', function(req, res, next) {

    let hrefURL = req.body.urlhref;

    wxShare.prototype.accessToken(hrefURL, function(data) {

        res.json(data);

    });

});

module.exports = router;

