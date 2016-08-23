//基础配置
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var proxy = require('express-http-proxy');
var hbs = require('hbs');
//引入session模块
var session = require('express-session');

var app = express();
//配置服务器代理 解决跨域问题
app.use('/api', proxy('www.＊＊＊.com'));
//配置session
app.use(session({ 
    secret: 'myhhhhhhhhhhhhhheedesecret',
    resave: true, 
    saveUninitialized:false,
    cookie: { maxAge: 60 * 30 * 1000 }
}));

// view engine setup
//配置hbs模板
app.set('views', path.join(__dirname, 'views'));
app.engine('html', hbs.__express);
app.set('view engine', 'html');
//类似于include的配置
hbs.registerPartials(__dirname + '/views/partials');

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});


hbs.registerHelper('block', function(name, context) {
    var len = (blocks[name] || []).length;
    var val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return len ? val : context.fn(this);
});



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

module.exports = app;
