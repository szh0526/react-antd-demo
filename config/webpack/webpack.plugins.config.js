/*
 * @Description: webpack配置plugins
 * 用来拓展Webpack功能,会在整个构建过程中生效，执行相关的任务
 * @Author: zehao.sun 
 * @Date: 2017-07-24 16:02:45 
 * @Last Modified by: zehao.sun
 * @Last Modified time: 2018-04-13 10:11:09
 * @Email: 
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html-webpack-plugin将要去除
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const paths = require('./paths');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); //解决大小写敏感性不严格的路径问题，如果路径有误则直接报错
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin'); // 此插件允许你安装库后自动重新构建打包文件。

let def_plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(paths.vendorManifestJson)
    }),
    //跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
    new webpack.NoEmitOnErrorsPlugin()
];


if (NODE_ENV == "test") { //如果是本地开发环境则添加指定插件
    def_plugins = def_plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        // 自动生成带有入口文件引用的index.html。
        new HtmlWebpackPlugin({
            inject: false,
            template: paths.indexHtml,
        }),
        // 当开启 HMR 的时候,在浏览器控制台中打印更多可读的模块名称,查看HMR更新哪些模块的路径，建议用于开发环境
        new webpack.NamedModulesPlugin(),
        // 启用模块热替换
        new webpack.HotModuleReplacementPlugin(),
        // 如果路径有误则直接报错
        new CaseSensitivePathsPlugin(),
        // 此插件允许你安装库后自动重新构建打包文件。
        new WatchMissingNodeModulesPlugin(paths.nodeModules)
    ]);
} else {
    def_plugins = def_plugins.concat([
        // process.env.NODE_ENV = production
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin({
            filename: "[name].css",
            ignoreOrder: true,
            allChunks: true //所有CSS文件合并成1个文件 不添加allChunks参数的话，不会抽离chunk的css
        }),
        //删除未引用代码
        new UglifyJSPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            },
            comments: false
        }),
        //合并请求 限制最大chunk数
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 }),
        //合并请求 限制最小chunk数
        new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 })
    ]);
}

module.exports = def_plugins;