/*
 * @Description:  webpack配置文件
 * webpack专注于js,css,html的预处理, gulp专注于任务流
 * 模块和任务管理工具(前端工程化打包工具)
 * 替代部分 grunt/gulp 的工作，比如打包、压缩混淆、图片转base64等
 * 确定不会在生产环境打包多余的代码, 比如 热加载 去除所有注释, 压缩所有可压缩的资源文件. 开启 gzip压缩.
 * @Author: zehao.sun 
 * @Date: 2017-07-19 16:00:24 
 * @Last Modified by: zehao.sun
 * @Last Modified time: 2018-04-13 10:10:53
 * @Email: 
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const paths = require('./paths');
const webpack_plugins = require('./webpack.plugins.config');
const webpack_module = require('./webpack.module.config');
const webpack_resolve = require('./webpack.resolve.config');

//解决DeprecationWarning错误,放在webpack模块被加载前设置才有效
process.noDeprecation = true;

let config = {
    /**
     * 配置生成Source Maps，上线后的devtool要配置为source-map
     */
    devtool: NODE_ENV == "test" ? "#cheap-module-source-map" : '#source-map',
    entry: {},
    /**
     * output为打包后生成的文件名及路径 合并以后的js会命名为bundle.js
     */
    output: {
        //输出的路径
        path: paths.build,
        // 指定服务器读取时的路径，此处设置为。
        publicPath: paths.serverPath,
        // 指定了打包的名字和基本的引用路径
        filename: '[name].js',
        //按需加载模块
        chunkFilename: NODE_ENV == "test" ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
        // pathinfo为true，在打包文件后，在其中所包含引用模块的信息，这在开发环境中有利于调试。
        pathinfo: NODE_ENV == "test" ? true : false,
        //指定了map位于磁盘的位置
        devtoolModuleFilenameTemplate: info => {
            NODE_ENV == "production" ?
                path.relative(paths.src, info.absoluteResourcePath).replace(/\\/g, '/') :
                path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
        }
    },
    module: webpack_module,
    plugins: webpack_plugins,
    resolve: webpack_resolve,
    /**
     * Webpack 可被用于监视模式（watch mode）。这种模式下， webpack 会监视你的文件，当它们有变动的时候就会重编译。
     * webpack相对来说比较耗时，尤其是项目较复杂时，需要解析的文件较多。增量构建需要给webpack配置添加watch参数。
     */
    watch: true,
    //缓存
    cache: true,
    //如果有error不尝试继续执行.
    bail: NODE_ENV == "test" ? false : true,
    // 设置node的dgram/fs/let/tls模块的的值，如果在其它环境中使用时值为empty。
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    //打包后命令行中该如何展示性能提示，比如是否开启提示，资源如果超过某个大小时该警告还是报错 hints: false:不提示测试环境的打包结果。
    performance: NODE_ENV == "test" ? { hints: false } : {},
};

/**
 * 配置自动化
 * 使用 glob 动态添加 entry入口index，生成一个键值对
 * key形如 /*.entry,value是入口文件的路径。之后设置给config.entry
 * 尽量以 glob 的方式匹配文件，避免增加一个业务文件就需要修改配置
 */
let entryFiles = glob.sync('./static/src/js/page/**/*.entry.js');
let newEntries = entryFiles.reduce((memo, filePath) => {
    let newfilePath = replacePath(filePath);
    let key = newfilePath.substring(0, newfilePath.lastIndexOf('.'));
    //console.log("chunk:" + key + " &&&&& file:" + filePath);

    memo[key] = [
        require.resolve('./polyfills'),
        filePath
    ];
    if (NODE_ENV == "test") {
        memo[key].unshift(require.resolve('react-dev-utils/webpackHotDevClient'));
    }
    return memo;
}, {});

config.entry = Object.assign({}, config.entry, newEntries);

function replacePath(filePath) {
    return filePath.replace("./static/src/", "");
}

module.exports = config;