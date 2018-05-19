const gulp = require("gulp");
var express = require('express'); //express框架
const path = require("path");
const fse = require("fs-extra");
const proxy = require("http-proxy-middleware");
const vueHtml = require("./plugins/vue-html");
const scssCompiler = require("./plugins/scss-compiler");
var c = require('child_process');//子进程 用于打开默认浏览器
const ip = require('quick-local-ip').getLocalIP4();
const shelljs = require('shelljs');
const buildPath = path.resolve("./dist");
const srcPath = path.resolve("./src");
const htmlPath = path.resolve(srcPath, "./pages/*.html");
const cssHotServer = require('./css-hot-reload/server');
const concat = require('gulp-concat');
const glob = require('glob');

const proxyUrl = "";
gulp.task("server", (cb) => {
    gulp.run("reBuild");
    var app = express();
    app.use(express.static(buildPath));
    app.use('/api', proxy({
        target: proxyUrl || "http://www.example.org",
        changeOrigin: true,
        pathRewrite: {
            "^api": ""
        }
    }));
    app.listen(8088, function () {
        cssHotServer.start();
        gulp.watch(htmlPath, function () {
            gulp.run("extract-html");
            gulp.on('css-extract', function () {
                cssHotServer.notify();
            })
        });
        gulp.watch(path.resolve("./src/!(pages)"), function () {
            gulp.run("copy");
        });

        setTimeout(()=>{
            // 等待copy完成
            c.exec(`start http://localhost:8088/pages/index.html`);
            console.log(`listen on http://localhost:8088/pages/index.html`);
        },200)
    });
});

gulp.task("clean", (cb) => {
    fse.removeSync(buildPath);
    cb();
});

gulp.task("copy-css", () => {
    // 总是先生成common.css再被static中的common.css(空的)覆盖,所以老是为空,需要跳过。
    // return gulp.src(path.resolve(srcPath, "./**/!(common.css)")).pipe(gulp.dest(`${buildPath}`));
    return gulp.src(path.resolve(srcPath, "./css/!(bundle.css)")).pipe(scssCompiler()).pipe(concat(`bundle.css`)).pipe(gulp.dest(`${buildPath}/css`))
});


gulp.task("copy-js", () => {
    return gulp.src(path.resolve(srcPath, "./js/!(bundle.js)")).pipe(concat(`bundle.js`)).pipe(gulp.dest(`${buildPath}/js`));
});

gulp.task("copy-other", () => {
    return gulp.src(path.resolve(srcPath, "./!(css|js|pages)/**")).pipe(gulp.dest(`${buildPath}`));
});

gulp.task("copy", ["copy-css", "copy-js","copy-other"]);

gulp.task("extract-html",() => {
    return gulp.src(htmlPath).pipe(vueHtml({dist: buildPath, development: true})).pipe(gulp.dest(`${buildPath}/pages`));
});

gulp.task("build", ["extract-html","copy"]);

gulp.task("reBuild", ["clean","build"]);

gulp.task("default", ["server"]);

gulp.run();