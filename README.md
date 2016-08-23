# node-express by bolide

更新日志：  
- 更懂后端程序员
- node-express4.0版本
- 删除原有jade模版引擎，引用hbs模版引擎
- 引用了express-session模块（4.0版本已拆分session模块）
- 引用了winston进行日志管理
- 引用express-http-proxy，解决前端请求第三方服务引起的跨域问题
- 重写http模块get,post请求
- 拆分项目结构，mvc模式
⚠️：使用了node-dev启动项目，须安装node-dev模块，开发环境使用正常模式启动，如：forever

##### 使用
    npm install //安装依赖
    npm start //启动项目

##### 项目结构：
    bin
    |--www
    logs
    server
    |--index
    |----controller
    |------index.js
    |----service
    |--util
    |----common.js
    |----http.js
    static
    |--css
    |----src
    |------index.scss
    |----index.css
    |--images
    |--js
    views
    |--partials
    |----footer.html
    |----head.html
    |--error.html
    |--index.html
    |--layout.html
    app.js
    gulpfile.js
    looger.js
    package.json
说明：  
1.使用sass开发，不需要的可删除，gulpfile文件已配置自动编译，启动项目后须启动gulp可实现sass自动编译
2.gulp引入tinypng对图片进行压缩，具体请参考tinypng api https://www.npmjs.com/package/gulp-tinypng-compress