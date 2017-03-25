var gulp = require('gulp');
var gulpSequence = require('gulp-sequence').use(gulp);//顺序执行或并行
var sequence = require('gulp-sequence');
var bower = require('gulp-bower');
var cache = require('gulp-cached');//可记录修改过的文件,利器
var plugins = require('gulp-load-plugins')();
var path = require('path');

gulp.task('clean', function () {
    gulp.src('app/lib/*')
        .pipe(plugins.clean());
});

gulp.task('copy-lib', function () {//复制第三方库文件
    return gulp.src(['bower_components/**/*.min.+(js|css)','bower_components/**/*.map',
        'bower_components/**/require.js'
    ]).pipe(gulp.dest('modules/static/common/libs/'));
});

gulp.task('bower', function() {
    console.info("bower 第三方库下载中...");
    return bower();
});

gulp.task('default',gulpSequence('clean','bower', 'copy-lib'));//默认会根据/config.json文件进行环境的打包