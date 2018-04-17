/*
 * @Description: webpack-dev-server服务配置文件
 * 启动express本地服务器
 * @Author: zehao.sun 
 * @Date: 2017-11-17 11:45:38 
 * @Last Modified by: zehao.sun
 * @Last Modified time: 2018-04-13 10:11:01
 * @Email: 
 */
'use strict';
const path = require('path');
const paths = require('./paths');

module.exports = {
    //解决dev-server服务css,js,jpeg等静态资源跨域问题
    headers: { 'Access-Control-Allow-Origin': "*" },
    //静态服务器源路径
    contentBase: paths.build,
    // 开发环境用‘/’
    publicPath: paths.serverPath,
    //配置host
    host: paths.devServer.host,
    //设置端口号
    port: paths.devServer.port,
    //控制台中不输出打包的信息 false打印
    quiet: true,
    // 不显示任何信息 false 显示
    noInfo: true,
    //开启热点
    hot: true,
    //开启页面自动刷新
    inline: true,
    // 开启https
    https: false,
    //不启动懒加载
    lazy: false,
    //默认检查hostname。如果hostname不是配置内的，将不可访问  
    //问题：使用hostname访问，就会显示invalid host header。 禁止检查：true 
    disableHostCheck: true,
    //启动gzip压缩
    compress: true,
    // 一般不会用webpackdevserver自己的日志
    //使用此设置仍将显示编译警告和错误.
    clientLogLevel: 'none',
    // 监听静态服务器源路径.
    watchContentBase: true,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: new RegExp(
            `^(?!${path
                    .normalize(paths.src + '/')
                    .replace(/[\\]+/g, '\\\\')}).+[\\\\/]node_modules[\\\\/]`,
            'g'
        ),
    },
    overlay: false,
    //搭配react-router时 
    //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    historyApiFallback: true,
    //代理
    proxy: {}
};