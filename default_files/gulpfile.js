//Config
var config = {
    css: [
        'j42/less/base.less'
    ],
    js: [
        'j42/js/root.js',
        'j42/js/elements.class.js',
        'j42/js/config.js'
    ]
};

//
var gulp = require('gulp');
var watch = require('gulp-watch');
var path = require('path');
var concat = require('gulp-concat');
//
var jshint = require('gulp-jshint');
var jsmin = require('gulp-jsmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var minifyhtml = require('gulp-minify-html');
//
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var base64 = require('gulp-base64');
var imageminPngquant = require('imagemin-pngquant');
var imageminZopfli = require('imagemin-zopfli');
var imageminGiflossy = require('imagemin-giflossy');
var imageminGuetzli = require('imagemin-guetzli');
gulp.task('default', ['clean'], function () {
    gulp.src('index.html').pipe(gulp.dest('dev/'));
    gulp.start('default2');
});
gulp.task('default2', ['images'], function () {
    gulp.start('less');
    gulp.start('js');
    console.log('Assets built!');
});

//Gulp Tasks
gulp.task('images', function () {
    var png_1 = imageminPngquant({
        speed: 1,
        quality: 94
    });
    var png_2 = imageminZopfli({
        more: true
    });
    var gif = imageminGiflossy({
        optimizationLevel: 3,
        optimize: 3,
        lossy: 2
    });
    var svg = imagemin.svgo({
        plugins: [{
                removeViewBox: false
            }]
    });
    var jpg_1 = imagemin.jpegtran({
        progressive: true
    });
    var jpg_2 = imageminGuetzli();
    return gulp.src('./images/**/*')
            .pipe(imagemin([
                png_1, png_2,
                gif,
                svg,
                jpg_1, jpg_2
            ])).pipe(gulp.dest('./dev/images/'));
});
gulp.task('less', function () {
    return gulp.src(config.css)
            .pipe(concat('styles.css'))
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(base64({
                baseDir: 'dev/images/',
                maxImageSize: 10 * 1024
            }))
            .pipe(sourcemaps.write())
            .pipe(autoprefixer(["last 8 version", "> 1%", "ie 8", "ie 7"]), {cascade: true})
            .pipe(gulp.dest('./dev/css/'));
});
gulp.task('js', function () {
    return gulp.src(config.js)
            .pipe(sourcemaps.init())
            .pipe(concat('script.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./dev/js/'));
});
//
gulp.task('build-css', function () {
    return gulp.src('./dev/css/*.css')
            .pipe(minifyCSS())
            .pipe(gulp.dest('./dist/css/'));
});
gulp.task('build-js', function () {
    return gulp.src('./dev/js/*.js')
            .pipe(jsmin())
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js/'));
});
gulp.task('clean', function () {
    return gulp.src('./dev/*', {read: false}).pipe(clean());
    return gulp.src('./dist/*', {read: false}).pipe(clean());
});
gulp.task('build', ['clean'], function () {
    gulp.src('index.html')
            .pipe(minifyhtml())
            .pipe(gulp.dest('dist/'));
    gulp.start('build2');
});
gulp.task('build2', ['images'], function () {
    gulp.start('build3');
});
gulp.task('build3', ['less', 'js'], function () {
    gulp.start('build-css');
    gulp.start('build-js');
});
gulp.task('watch', ['watch-less', 'watch-js', 'watch-images'], function () {
    console.log('Watching LESS, JS, Images');
});
gulp.task('watch-less', function () {
    gulp.watch('./less/**/*.less', ['less']);
    gulp.watch('./j42/less/**/*.less', ['less']);
});
gulp.task('watch-js', function () {
    gulp.watch('./js/**/*.js', ['js']);
    gulp.watch('./j42/js/**/*.js', ['js']);
});
gulp.task('watch-images', function () {
    gulp.watch('./images/**/*', ['images']);
    gulp.watch('./j42/images/**/*', ['images']);
});