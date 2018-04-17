/**
 * gulp 自动化构建任务
 * gulp + webpack的基本玩法就是 配置一个基础的webpackConfig，gulp的task里，根据需要，动态微调基本的webpackConfig。
 */
const url = require('url');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const gulp = require("gulp");
const gutil = require("gulp-util");
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const runSequence = require("run-sequence");
const webserver = require('gulp-webserver');
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const paths = require('./config/webpack/paths.js');

//nodejs 在 require 一个模块后会缓存起来，除非重启 express，想要数据文件不被缓存，先 delete require.cache[xxx] 再 require 进来
delete require.cache[require.resolve('./paths')];

/**
 * 自动构建任务
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
let webpackBuild = (callback) => {
    var devConfig = require("./config/webpack/webpack.config.js");
    //编译webpack
    var devCompiler = webpack(devConfig);
    return devCompiler.run((err, stats) => {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        //gutil.log('[webpack:build:config]', devConfig);
        callback();
    });
}

/**
 * 生成第三方库dll任务(vendor.dll.js,vendor.dll.css)
 * @param  {Function} callback [description]
 * @return {[type]}        [description]
 */
let webpackVenderDll = (callback) => {
    var compiler = webpack(require("./config/webpack/webpack.dll.config")());
    return compiler.run((err, stats) => {
        if (err) throw new gutil.PluginError("webpack:vender-dll", err);
        gutil.log("[webpack:vender-dll]", stats.toString({
            colors: true
        }));
        callback();
    });
}

/**
 * 启动 webpack 开发环境服务
 * 建本地服务器(热启动,自动刷新浏览器)
 * 将在 localhost:8080 启动一个 express 静态资源 web 服务器，并且会以监听模式自动运行 webpack，
 * 在浏览器打开 http://localhost:8080/可以浏览项目中的页面和编译后的资源输出，
 * 并且通过一个 socket.io 服务实时监听它们的变化并自动刷新页面。
 * contentBase	默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
 * quiet: //控制台中不输出打包的信息，开发中一般设置为false，进行 打印，这样查看错误比较方面
 * no-info: // 不显示任何信息
 * colors: //对信息进行颜色输出
 * no-colors: //对信息不进行颜色输出
 * compress:  //开启gzip压缩
 * host <hostname/ip>: //设置ip
 * port <number>: //设置端口号，默认是:8080
 * inline: //webpack-dev-server会在你的webpack.config.js的入口配置文件中再添加一个入口,
 * hot: //开发热替换
 * open: //启动命令，自动打开浏览器
 * progress: true, //显示打包的进度
 * history-api-fallback: //查看历史url
 */
let webpackDevServer = (callback) => {
    if (NODE_ENV == "test") {
        let devConfig = require("./config/webpack/webpack.config.js");
        //编译webpack
        let devCompiler = webpack(devConfig);
        //这两项配置原本是在webpack.config.dev.js里边配置，可是通过gulp启动devserver，那种配置无效，只能在此处写入
        //官网的解释是webpack-dev-server没有权限读取webpack的配置
        let entrys = _.tail(Object.getOwnPropertyNames(devConfig.entry));
        _.map(entrys, (item) => {
            //每个页面entry入口 devConfig.entry[item]
            return devConfig.entry[item].unshift("webpack-dev-server/client?" + paths.devServer.url + "webpack/hot/dev-server");
        });
        const serverConfig = require('../config/webpack/webpack.devserver.config');
        let server = new WebpackDevServer(devCompiler, serverConfig);
        server.listen(paths.devServer.port, paths.devServer.host, (err) => {
            if (err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log('[webpack-dev-server]', paths.serverPath);
            callback();
        });
    } else {
        callback();
    }
}

let cleanCss = () => {
    return del([
        // 通配模式来匹配 `mobile` 文件夹中的所有东西
        path.join(paths.build, "/js/page/**/*.entry.css"),
        // 反通配模式 '!dist/mobile/deploy.json' 
    ]);
}

let clean = () => del([paths.build]);
let copyCss = () => gulp.src(path.join(paths.src, "/css/page/**/*.entry.css")).pipe(gulp.dest(path.join(paths.build, "css/page")));
let copyFonts = () => gulp.src(path.join(paths.src, "fonts/*")).pipe(gulp.dest(path.join(paths.build, "fonts")));
let copyImages = () => gulp.src(path.join(paths.src, "images/**/*")).pipe(gulp.dest(path.join(paths.build, "images")));
let copyLibrary = () => gulp.src(path.join(paths.src, "js/library/**/*")).pipe(gulp.dest(path.join(paths.build, "js/library")));
let copyPlugin = () => gulp.src(path.join(paths.src, "plugin/**/*")).pipe(gulp.dest(path.join(paths.build, "plugin")));
let buildCallBack = (callback) => {
    gutil.log('[build:callback]', 'build success');
    callback();
}

let reduceByCallBack = (type, arr = []) => {
    if (NODE_ENV != "test") {
        let sep = path.sep; //返回操作系统中文件分隔符； window是'\\', linux是'/'
        let delimiter = path.delimiter; //返回操作系统中目录分隔符，如window是';', Unix中是':'
        arr.reduce((memo, filePath) => {
            let fileName = path.basename(filePath); //获取文件名
            let fileExt = path.extname(filePath); //获取扩展名
            let fileRoot = path.resolve(filePath, '..'); //文件所在目录
            let isExist = (path) => filePath.indexOf('build' + path) !== -1;
            let newfilePath = path.resolve(process.cwd(), filePath);
            if (type == "css" && (isExist("/css/") || isExist("/dll/") || isExist("/plugin/combine"))) {
                gutil.log('[minify-css-path]', newfilePath);
                gulp.src(newfilePath) //压缩的文件
                    .pipe(autoprefixer({
                        browsers: ['last 2 versions'],
                        cascade: true, //是否美化属性值 默认：true
                        remove: true //是否去掉不必要的前缀 默认：true 
                    })) //添加css前缀,解决浏览器兼容性
                    .pipe(cleanCSS({ compatibility: 'ie8' })) //执行压缩
                    .pipe(vinylPaths(del)) //获取 stream 中每个文件的路径并删除
                    .pipe(rename({ suffix: '.min' })) //rename压缩后的文件名
                    .pipe(gulp.dest(fileRoot)); //输出文件夹
            }

            if (type == "js" && (isExist("/js/page/") || isExist("/dll/") || isExist("/plugin/combine"))) {
                gutil.log('[minify-js-path]', newfilePath);
                gulp.src(newfilePath) //压缩的文件
                    .pipe(babel({
                        presets: [
                            ["es2015", { "modules": false }], "stage-2"
                        ],
                        compact: true
                    }))
                    .pipe(uglify()) //执行压缩
                    .pipe(vinylPaths(del)) //获取 stream 中每个文件的路径并删除; //输出文件夹
                    .pipe(rename({ suffix: '.min' })) //rename压缩后的文件名
                    .pipe(gulp.dest(fileRoot)); //输出文件夹
            }
            return memo;
        }, {});
    }
}

/**
 * 合并第三方css
 * @return {[type]} [description]
 */
let combine_all_css = () => {
    //按照指定的顺序进行拼接
    let combineCssArr = [];
    //sourcemaps 压缩后就没了
    return gulp.src(combineCssArr)
        //.pipe(sourcemaps.init())
        .pipe(concat('combine.all.css'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./static/build/plugin/combine'));
}

/**
 * 合并自定义css
 * @return {[type]}  [description]
 */
let combine_common_css = () => {
    //按照指定的顺序进行拼接
    let combineCssArr = [];

    //sourcemaps 压缩后就没了
    return gulp.src(combineCssArr)
        //.pipe(sourcemaps.init())
        .pipe(concat('combine.common.css'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./static/build/plugin/combine'));
}

/**
 * 合并第三方js
 * @return {[type]}  [description]
 */
let combine_all_js = () => {
    //按照指定的顺序进行拼接
    let combineJsArr = [];
    //sourcemaps 压缩后就没了
    return gulp.src(combineJsArr)
        //.pipe(sourcemaps.init())
        .pipe(concat('combine.all.js'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./static/build/plugin/combine'));
}

gulp.task('minify:css', () => reduceByCallBack("css", glob.sync('./static/build/**/*.{css,less}')));
gulp.task('minify:js', () => reduceByCallBack("js", glob.sync('./static/build/**/*.js')));
gulp.task("copy:fonts", copyFonts);
gulp.task("copy:images", copyImages);
gulp.task("copy:plugin", copyPlugin);
gulp.task("copy:library", copyLibrary);
gulp.task("copy:css", copyCss);
gulp.task("build:copy", (callback) => {
    runSequence('copy:fonts', 'copy:images', 'copy:plugin', 'copy:library', 'copy:css', callback);
});
gulp.task("build:minify", (callback) => {
    runSequence('minify:js', 'minify:css', callback)
});
gulp.task("build:clean", clean);
gulp.task("devserver", webpackDevServer);
gulp.task("build:webpack", webpackBuild);
gulp.task("build:callback", buildCallBack);

gulp.task('dll:vender', webpackVenderDll);
gulp.task("build:dll", ['dll:vender'], () => {
    gutil.log('[build:dll]', 'finished');
});

gulp.task('combine:all:css', combine_all_css);
// 定义一个所依赖的 task 必须在这个 task 执行之前完成
gulp.task('combine:all:js', ['combine:all:css'], combine_all_js);
gulp.task('combine:common:css', ['combine:all:js'], combine_common_css);
gulp.task("build:combine", ['combine:all:css', 'combine:all:js', 'combine:common:css'], () => {
    gutil.log('[build:combine]', 'finished');
});


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
        "build:combine",
        "build:minify",
        "build:callback"
    )
});

//监听文件变化,并移动到指定文件夹
gulp.task('watch', function() {
    const getPath = (src) => path.join(paths.src, src);
    //任务 key:路径 value:任务
    let watchObj = {
        //移动css/page
        "css/page/**/*.entry.css": ["copy:css"],
        //移动css/common
        "css/common/*.css": combine_common_css,
        //移动js/common
        "js/common/**/*.js": ["build:dll"],
        //移动images
        "images/**/*": ["copy:images"],
        //移动fonts
        "fonts/**/*": ["copy:fonts"],
        //移动plugin
        "plugin/**/*": ["copy:plugin"],
        //移动library
        "js/library/**/*": ["copy:library"]
    };
    for (let [k, v] of Object.entries(watchObj)) {
        gulp.watch(path.join(paths.src, k), v);
    }
});