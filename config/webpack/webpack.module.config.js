/*
 * @Description: webpack配置module
 * @Author: zehao.sun 
 * @Date: 2017-07-24 16:02:45 
 * @Last Modified by: zehao.sun
 * @Last Modified time: 2018-04-13 10:11:05
 * @Email: 
 */
const path = require('path');
const autoprefixer = require('autoprefixer'); //css兼容加前缀版本postcss
const paths = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter'); //js/jsx文件格式化插件

module.exports = {
    //这里设置为true,表明文件中如果缺少exports时会直接报错而不是警告。
    strictExportPresence: true,
    /**
     * 模块和资源的转换器
     * loader处理各种资源使用对应的加载器处理
     * test ：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
     * loader ：loader的名称（必须）
     * include/exclude :手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
     * query ：为loaders提供额外的设置选项（可选）
     * loader 可以为string或数组["style", "css"] 或 style!css
     */
    rules: [
        // 对js/jsx文件前置使用eslint检查，设置formatter格式为eslintFormatter。
        // {
        //     test: /\.(js|jsx|mjs)$/,
        //     enforce: 'pre',
        //     use: [{
        //         options: {
        //             formatter: eslintFormatter,
        //             eslintPath: require.resolve('eslint'),

        //         },
        //         loader: 'eslint-loader',
        //     }],
        //     include: paths.src,
        // }, 
        {
            // 有一个匹配的loader则进入oneOf配置否则加载其他插件
            oneOf: [
                /**
                 * babel编译es6，react的jsx
                 * exclude来限定 npm 的禁用范围
                 * include来限定 babel 的使用范围，
                 * 提交到github时需要把babel模块排除掉
                 * es7语法分四个阶段分别对应四个插件 babel-preset-stage-0 1 2 3  
                 * 目前我们写 javascript 代码时，需要使用 N 个 preset，比如：babel-preset-es2015、babel-preset-es2016。es2015 可以把 ES6 代码编译为 ES5，
                 * es2016 可以把 ES2016 代码编译为 ES6。babel-preset-latest 可以编译 stage 4 进度的 ECMAScript 代码。
                 * .babelrc rc结尾的文件通常代表运行时自动加载的文件
                 * cacheDirectory选项，将babelloader的速度提高到2倍。缓存到文件系统,避免重新编译
                 */
                {
                    test: /\.(js|jsx|mjs)$/,
                    include: [paths.src],
                    //exclude: /(node_modules|lib)/,
                    use: [{
                        loader: 'babel-loader',
                        query: {
                            compact: NODE_ENV == "test" ? false : true,
                            babelrc: false,
                            cacheDirectory: NODE_ENV == "test" ? true : false,
                            presets: [require.resolve('babel-preset-react-app')],
                            //antd `style: true` 会加载 less 文件
                            plugins: [
                                NODE_ENV == "test" ? 'react-hot-loader/babel' : "", 
                                ['import', [{ libraryName: 'antd', style: 'css' }]],
                                "transform-runtime",
                                "transform-decorators-legacy"
                            ],
                        }
                    }]
                },
                /**
                 * 添加对样式表的处理
                 * 注：感叹号的作用在于使同一文件能够使用不同类型的loader
                 * css会和js打包到同一个文件中也可以打包到单独的css文件中
                 * modules相同的类名不会造成不同组件之间的污染，只对当前组件有效
                 * 从右向左开始使用，less->转为css字符串->使用style将代码放到页面style标签中。
                 * 对css文件，按顺序调用style-loader->css-loader->postcss-loader->sass-loader进行处理。
                 */
                {
                    test: /\.(css|scss)$/,
                    //排除node_modules和antd 解决css modules 与antd冲突
                    exclude: /node_modules|antd\.css/,
                    use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader',
                            options: {
                                //sourceMap: true,
                                importLoaders: 1, //方便postCss
                                modules: true, //解决不同的模块中使用相同的类名造成冲突,解决css中class名的污染
                                localIdentName: "[name]-[local]-[hash:base64:8]"
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                //sourceMap: true,
                                config: {
                                    path: 'postcss.config.js'
                                }
                            },
                        }, {
                            loader: 'sass-loader',
                            options: {
                                //sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    //包含node_modules和antd 解决css modules 与antd冲突
                    include: /node_modules|antd\.css/,
                    use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader',
                            options: {
                                //sourceMap: true,
                                importLoaders: 1, //方便postCss
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                //sourceMap: true,
                                config: {
                                    path: 'postcss.config.js'
                                }
                            },
                        }
                    ]
                },
                // {
                //     test: /\.(css|scss)$/,
                //     use: ExtractTextPlugin.extract({
                //         fallback: 'style-loader',
                //         use: [{ 
                //                 loader: 'css-loader', 
                //                 options: { 
                //                     sourceMap: true,
                //                     importLoaders: 1,//方便postCss
                //                     modules: true,//解决不同的模块中使用相同的类名造成冲突,解决css中class名的污染
                //                     localIdentName:"[name]-[local]-[hash:base64:8]"
                //                 } 
                //             },{
                //                 loader: 'postcss-loader',
                //                 options: {
                //                     sourceMap: true,
                //                     config: {
                //                         path: 'postcss.config.js'
                //                     }
                //                 },
                //             },{
                //                 loader: 'sass-loader', 
                //                 options: {
                //                     sourceMap: true 
                //                 }
                //             }
                //         ]
                //     })
                // },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[hash:8].[ext]'
                    }
                },
                {
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    loader: 'file-loader',
                    options: {
                        limit: 1000,
                        name: 'fonts/[name].[hash:8].[ext]'
                    }
                }
                // ** STOP ** 如果新增加的插件要放在 file-loader之前.
            ],
        }
    ]
}