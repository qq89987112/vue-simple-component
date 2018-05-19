var through = require('through2');
var nodesass = require("node-sass");
var fse = require("fs-extra");
var path = require("path");
var jsBeautify = require('js-beautify');
var cssHotReloadClient = require("../css-hot-reload/client");
var gulp = require('gulp');
module.exports = function({dist,development}) {


    function doSomething(file, encoding, callback) {

        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return callback(createError(file, 'Streaming not supported'));
        }
        let content = file.contents.toString();
        let reg = /<style lang="scss">([\s\S]+)<\/style>/;
        let result = reg.exec(content);
        if(result){
            let matchText = result[0];
            result = result[1];
            result = nodesass.renderSync({
                data:result
            });

            let fileName = `${path.basename(file.path,path.extname(file.path))}.css`;
            fse.outputFileSync(path.resolve(dist,`./css/${fileName}`),result.css.toString());
            gulp.emit('css-extract');
            let hotHtml = development ? `<script>${cssHotReloadClient.toString()};initHot();</script>`:'';
            content = jsBeautify.html(content.replace(matchText,`<link rel="stylesheet" id="css" href="../css/${fileName}"/>${hotHtml}`));
        }

        file.contents = new Buffer(content);

        callback(null, file);
    }

    return through.obj(doSomething);
};