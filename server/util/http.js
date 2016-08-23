var http = require("http");
var https = require('https');
var qs = require('querystring');
var BufferHelper = require('bufferhelper');
var iconv = require('iconv-lite');

var common = require('../util/common');

var httpUtil = {
    /**
     * @description 发起远程请求的基础方法
     * @param {Object} options 请求选项
     * @param {String} [options.protocol='http'] 请求协议
     * @param {String} [options.method='get'] 请求方法，get、post...
     * @param {Object=} options.headers 请求头
     * @param {String=} options.encode 请求数据的编码格式，如果是gbk，使用escape编码
     * @param {Boolean=} [options.json=false] 发送的是否json数据
     * @param {Boolean=} [options.buffer=false] 是否直接返回二进制数据
     * @param {Number=} timeout 超时时间，单位为毫秒
     * @param {Object=} data 请求发送的数据对象
     * @param {RequestCallback} callback 处理请求响应的回调方法，查看 {@link RequestCallback}
     * @param {String} [encoding='utf-8'] 编码格式
     */
    request: function(options, data, callback, timeout, encoding){
        var _options = {
            protocol:"http",
            method:"get",
            json:false,
            encode: "utf-8",
            buffer:false
        }
         
        options = common.extend(options, _options);

        timeout = timeout || 5000;
        
        var httpLib = http;
        if(options.protocol && options.protocol === "https"){
            httpLib = https;
        }

        var content = {};
        if(options.json){
            content = JSON.stringify(data);
        }else{
            content = (options.encode && options.encode.toLocaleLowerCase == "gbk") ?
                qs.stringify(data, null, null, {encodeURIComponent: escape}):
                qs.stringify(data);
        }

        if(options.method.toLocaleLowerCase() == "post"){
            options.headers = options.headers || {};
            options.headers['Content-Type'] = options.json ? 'application/json' : 'application/x-www-form-urlencoded';
            options.headers['Content-Length'] = Buffer.byteLength(content);
        }
        
        var req = httpLib.request(options, function(res){
            var bufferHelper = new BufferHelper();
           
            res.on('data', function(chunk){
                bufferHelper.concat(chunk);
            });
            res.on('end', function(){
                var _data;
                if(options.buffer){
                    _data = bufferHelper.toBuffer();
                }else{
                    if(typeof encoding != 'undefined' && encoding !== null ){
                        _data = iconv.decode(bufferHelper.toBuffer(), encoding);
                    }else{
                        _data = iconv.decode(bufferHelper.toBuffer(), "utf-8");
                    }
                }
                callback(_data, res, req);
            });
        });
        req.on('error', function(err){
            callback(err);
        });

        req.write(content);

        if(timeout && timeout > 0){
            req.setTimeout(timeout, function(){
                callback(new Error('request timeout'));
            });
        }
        req.end();
    },
    get: function(url, reqData, callback, encoding, header){
        var options = require('url').parse(url);
        options.method = "GET";
        if(header){
            options.headers = header;
        }
        this.request(options, reqData, callback, encoding, header);
    },
    post: function(url, reqData, callback, encoding, header){
        var options = require('url').parse(url);
        options.method = "POST";
        if(header){
            options.headers = header;
        }
        this.request(options, reqData, callback, encoding, header);
    }
}

module.exports = httpUtil;