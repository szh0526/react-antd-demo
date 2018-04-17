/*
 * @Description: 获取应用配置路径
 * @Author: zehao.sun 
 * @Date: 2017-11-16 15:47:35 
 * @Last Modified by: zehao.sun
 * @Last Modified time: 2018-04-13 10:10:58
 * @Email: 
 */
'use strict';
const path = require('path');
const fs = require('fs');
const url = require('url');

const node_modules = path.join(process.cwd(), 'node_modules');
const packageJson = path.join(process.cwd(), 'package.json');
const staticPath = path.join(process.cwd(), 'static');
const publicPath = path.join(staticPath, 'public');
const indexHtml = path.join(publicPath, 'index.html');
const build = path.join(staticPath, 'build');
const dll = path.join(build, 'dll');
const vendorManifestJson = path.join(dll, 'vendor-manifest.json');
const src = path.join(staticPath, 'src');
const components = path.join(src, 'components');


//获取每个配置文件在项目中的相对路径
const resolveApp = relativePath => path.resolve(staticPath, relativePath);
//确保路径带'/'斜线  
const ensureSlash = (path, needsSlash) => {
    //判断是否结尾是'/'
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

//webpack-dev-server配置 仅本地开发环境使用 
const devServer = {
    //启动后的源文件路径
    url: "http://localhost:8088/",
    //host
    host: "localhost",
    //端口号
    port: 8088
}

//获取服务地址 CDN地址 此路径后面的/必须加 否则devserver启动异常
const getServerPath = () => {
    const servedUrl = NODE_ENV == "test" ? devServer.url : build;
    return ensureSlash(servedUrl, true);
}

module.exports = {
    build: build, //构建目录, 静态服务器源路径
    dll: dll, //vendor-dll目录
    vendorManifestJson: vendorManifestJson, //vendor-dll映射路径
    static: staticPath, //静态资源目录
    src: src, //构建的源文件路径
    components: components, //构建的源文件路径
    nodeModules: node_modules, //应用node_modules
    packageJson: packageJson, //项目 npm配置文件
    serverPath: getServerPath(packageJson), //CDN地址
    devServer: devServer, //webpack-dev-server配置 仅本地开发环境使用 
    public: publicPath, //测试用
    indexHtml: indexHtml, //测试用
};