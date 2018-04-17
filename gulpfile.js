/**
 * gulp 自动化构建任务
 * gulp + webpack的基本玩法就是 配置一个基础的webpackConfig，gulp的task里，根据需要，动态微调基本的webpackConfig。
 */
const url = require('url');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const _ = require('lodash');
const gulp = require("gulp");
const gutil = require("gulp-util");
const del = require('del');
const runSequence = require("run-sequence");
const webpack = require("webpack");
const globalConfig = require('./config/globalConfig' + ((process.env && process.env.NODE_ENV && process.env.NODE_ENV == "production") ? "_" + process.env.NODE_ENV : ""))();
const paths = require('./config/webpack/paths.js');

process.env.BABEL_ENV = 'development';

//nodejs 在 require 一个模块后会缓存起来，除非重启 express，想要数据文件不被缓存，先 delete require.cache[xxx] 再 require 进来
delete require.cache[require.resolve('./config/webpack/paths.js')];

/**
 * 生成第三方库dll任务(vendor.dll.js,vendor.dll.css)
 * @param  {Function} callback [description]
 * @return {[type]}        [description]
 */
let webpackVenderDll = (callback) => {
    let compiler = webpack(require("./config/webpack/webpack.dll.config")());
    return compiler.run((err, stats) => {
        if (err) {
            console.log(chalk.red('[dll:vender] Failed to compile.\n' + err.message));
            process.exit(1);
        }

        // 打印详情日志 stats
        // gutil.log("[dll:vender]", stats.toString({
        //     colors: true
        // }));

        callback();
    });
}

/**
 * 启动webpack-dev-server
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
let webpackDevServer = (callback) => {
    if (NODE_ENV == "test") {
        const WebpackDevServer = require("webpack-dev-server");
        const clearConsole = require('react-dev-utils/clearConsole');
        const openBrowser = require('react-dev-utils/openBrowser');
        const {
            choosePort,
            createCompiler,
            prepareUrls
        } = require('react-dev-utils/WebpackDevServerUtils');

        choosePort(paths.devServer.host, paths.devServer.port)
            .then(port => {
                if (port == null) {
                    console.log(chalk.red('[devserver] Devserver failure.'));
                    return;
                }
                //获取应用名称
                const appName = require(paths.packageJson).name;
                //转换url地址
                const urls = prepareUrls('http', paths.devServer.host, paths.devServer.port);
                //获取webpack配置
                const config = require('./config/webpack/webpack.config');
                // webpack compiler编译器
                const compiler = createCompiler(webpack, config, appName, urls, false);
                // webpack-dev-server 配置
                const serverConfig = require('./config/webpack/webpack.devserver.config');
                //这两项配置原本是在webpack.config.dev.js里边配置，可是通过gulp启动devserver，那种配置无效，只能在此处写入
                //官网的解释是webpack-dev-server没有权限读取webpack的配置
                const entrys = Object.getOwnPropertyNames(config.entry);

                // _.map(entrys, (item) => {
                //     //每个页面entry入口 devConfig.entry[item]
                //     return config.entry[item].unshift("webpack-dev-server/client?" + paths.devServer.url + "webpack/hot/dev-server");
                // });
                
                //创建devserver配置
                const devServer = new WebpackDevServer(compiler, serverConfig);
                //运行 WebpackDevServer.
                devServer.listen(paths.devServer.port, paths.devServer.host, err => {
                    if (err) {
                        return console.log(err);
                    }
                    clearConsole();
                    //启动服务自动打开谷歌浏览器并输入地址
                    console.log(chalk.cyan('[devserver] Starting the devserver...\n'));
                    openBrowser(paths.serverPath);

                    callback();
                });

                //SIGINT,SIGQUIT,SIGTERM,SIGSTOP
                //http://blog.csdn.net/lanmanck/article/details/4568911
                ['SIGINT', 'SIGTERM'].forEach(function(sig) {
                    process.on(sig, function() {
                        devServer.close();
                        process.exit();
                    });
                });
            })
            .catch(err => {
                if (err && err.message) {
                    console.log(chalk.red('[devserver] Failed to compile.\n' + err.message));
                }
                process.exit(1);
            });
    } else {
        callback();
    }
}

/**
 * 自动构建任务
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
let webpackBuild = (callback) => {
    const fs = require('fs-extra');
    const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
    const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages'); //格式化webpack 错误消息
    const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
    const printBuildError = require('react-dev-utils/printBuildError');
    const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild; //测量文件大小
    const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild; //打印构建文件总数量
    const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024; // 文件大小限制警告
    const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024; // 文件大小限制警告

    // 对比(测量)有多少文件修改过
    // 首先，获取构建之前build文件夹下的文件数量
    // previousFileSizes:构建之前build文件夹下的文件数量
    measureFileSizesBeforeBuild(paths.build)
        .then(previousFileSizes => {
            //在此执行构建之前的任务
            //如: 清空build文件夹 fs.emptyDirSync(paths.build);
            //开始构建webpack
            return build(previousFileSizes);
        })
        .then(({ stats, previousFileSizes, warnings }) => {
                if (warnings.length) {
                    console.log(chalk.yellow('[build:webpack] Compiled with warnings.\n'));
                    console.log(warnings.join('\n\n'));
                    console.log(
                        '\nSearch for the ' +
                        chalk.underline(chalk.yellow('keywords')) +
                        ' to learn more about each warning.'
                    );
                    console.log(
                        'To ignore, add ' +
                        chalk.cyan('// eslint-disable-next-line') +
                        ' to the line before.\n'
                    );
                } else {
                    console.log(chalk.green('[build:webpack] Webpack compiled success!\n'));
                }

                //构建完之后文件大小是多少
                console.log(chalk.blue('[build:webpack] File sizes after gzip:\n'));
                printFileSizesAfterBuild(
                    stats,
                    previousFileSizes,
                    paths.build,
                    WARN_AFTER_BUNDLE_GZIP_SIZE,
                    WARN_AFTER_CHUNK_GZIP_SIZE
                );

                printHostingInstructions(
                    paths.packageJson,
                    paths.serverPath,
                    paths.serverPath,
                    paths.build,
                    false
                );

                // 打印详情日志 stats
                // gutil.log("[build:webpack]", stats.toString({
                //     colors: true
                // }));

                callback();
            },
            err => {
                console.log(chalk.red('[build:webpack] Failed to compile.\n'));
                printBuildError(err);
                process.exit(1);
            }
        );

    // 生产环境构建
    function build(previousFileSizes) {
        //获取webpack配置
        const config = require('./config/webpack/webpack.config');
        //创建生产环境编译器
        let compiler = webpack(config);
        return new Promise((resolve, reject) => {
            compiler.run((err, stats) => {
                if (err) {
                    return reject(err);
                }

                //转换错误消息
                const messages = formatWebpackMessages(stats.toJson({}, true));
                if (messages.errors.length) {
                    // 只显示一条错误信息，方便找错
                    if (messages.errors.length > 1) {
                        messages.errors.length = 1;
                    }
                    return reject(new Error(messages.errors.join('\n\n')));
                }
                if (messages.warnings.length) {
                    console.log(
                        chalk.yellow(
                            '\nTreating warnings as errors because process.env.CI = true.\n' +
                            'Most CI servers set it automatically.\n'
                        )
                    );
                    return reject(new Error(messages.warnings.join('\n\n')));
                }

                //webpack编译成功后resole返回一个对象{ stats, previousFileSizes, warnings }
                return resolve({
                    stats,
                    previousFileSizes,
                    warnings: messages.warnings,
                });
            });
        });
    }
}

let clean = () => del([paths.build]);
let buildCallBack = (callback) => {
    console.log(chalk.green('[build:callback] Build success!'));
    callback();
}

let copyAssets = () => gulp.src(path.join(paths.static, "public/*.png")).pipe(gulp.dest(paths.build));
gulp.task("build:clean", clean);
gulp.task("copy:assets", copyAssets);
gulp.task("build:copy", (callback) => {
    runSequence('copy:assets', callback);
});
gulp.task("build:callback", buildCallBack);
gulp.task('dll:vender', webpackVenderDll);
gulp.task("build:dll", ['dll:vender'], () => {
    console.log(chalk.green('[build:dll] Dll compile finished!'));
});
gulp.task("devserver", webpackDevServer);
gulp.task("build:webpack", webpackBuild);

/*
 * default 开发环境 build task
 * 命令行 gulp 可不输入default
 * gulp.task('prod', [a,b,c]);多个任务错乱执行
 * gulp.parallel(a,b,c): 并行执行 任务执行完成可以添加回调函数
 * gulp.series: 串行执行
 * 重点：默认的，task 将以最大的并发数执行，也就是说，gulp 会一次性运行所有的 task 并且不做任何等待。如果你想要创建一个序列化的 task 队列，并以特定的顺序执行，
 * 你需要做两件事：
 * 给出一个提示，来告知 task 什么时候执行完毕，
 * 并且再给出一个提示，来告知一个 task 依赖另一个 task 的完成。
 * (在定义一个gulp的任务时，gulp会传入一个回调函数作为参数，当你的任务完成时，调用这个回调函数，就可以通知gulp你的任务的确完成了：)
 */
gulp.task("default", (callback) => {
    runSequence(
        "build:clean",
        "build:dll",
        "build:webpack",
        "build:copy",
        // "build:combine",
        // "build:minify",
        //"devserver",
        "build:callback"
    )
});