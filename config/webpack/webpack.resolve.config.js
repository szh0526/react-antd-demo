/*
 * @Description: 文件解析配置
 * 会依次寻找不带后缀的文件，.js后缀文件以及.jsx后缀文件。
 * @Author: zehao.sun 
 * @Date: 2017-07-24 16:02:45 
 * @Last Modified by: zehao.sun
 * @Last Modified time: 2018-04-13 10:11:09
 * @Email: 
 */
const path = require('path');
const glob = require('glob');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin'); //用以限制自己编写的模块只能从src目录中引入
const paths = require('./paths');

let def_resolve = {
    //相对路径
    modules: ['node_modules', paths.nodeModules, paths.src],
    // 指明在引用模块时哪些后缀名可以忽略，这里忽略的文件名包括.js/.jsx/.web.js/.web.jsx等。
    extensions: ['.js', '.json', '.css', '.sass', '.jsx'],
    plugins: [
        //此处使用了ModuleScopePlugin的实例，用以限制自己编写的模块只能从src目录中引入
        new ModuleScopePlugin(paths.src, [paths.packageJson]),
    ],
    //模块别名定义 require('AppStore')
    alias: {}
};

/**
 * 动态映射src文件夹下的js,css文件路径 并与def_resolve 
 * key 就是文件名 + 后缀   dialog.css 或 font-awesome.min.css
 * 注意：匹配的文件不允许有重名
 * 组件：
        //Utilities: path.resolve(__dirname, 'src/utilities/'),
        //import Utility from '../../utilities/utility'; 替换成 import Utility from 'Utilities/utility';
 */
def_resolve.alias = glob.sync('./static/src/**/*.{js,css,scss}').reduce((memo, filePath) => {
    const fileName = key = path.basename(filePath), //获取文件名
        fileExt = path.extname(filePath), //获取扩展名
        sep = path.sep, //返回操作系统中文件分隔符； window是'\\', linux是'/'
        dirname = path.dirname(filePath);

    filePath = path.resolve(process.cwd(), filePath); //获取文件路径
    if(filePath.indexOf('/page/redux/') > -1) return memo;
    if (filePath.indexOf('/src/components') > -1) {
        const dirArr = key = dirname.split(sep).pop();
        filePath = filePath.replace(fileName, '');
    }
    if (!memo[key]) {
        memo[key] = filePath;
        //console.log("chunk:" + key + " &&&&& file:" + filePath);
    }
    return memo;
}, {});

module.exports = def_resolve;