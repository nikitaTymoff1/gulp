const gulp         = require('gulp');
const stylus       = require('gulp-stylus');
const sass         = require('gulp-sass');
const scss         = require('gulp-scss');
const postCss      = require('gulp-postcss');
const del          = require('del');
const less         = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const concat       = require('gulp-concat');
const pug          = require('gulp-pug');
const merge        = require('merge-stream');
const minify       = require('gulp-minify-css');
const cssnano      = require('gulp-cssnano');
const rename       = require('gulp-rename');
const uglify       = require('gulp-uglify');
const browserSync  = require('browser-sync').create();
const handlebars   = require('gulp-handlebars');
const wrap         = require('gulp-wrap');
const declare      = require('gulp-declare');
const mustache     = require('gulp-mustache');

exports.combineJs = function(path){
  return gulp.src(path)
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/js'));
};

exports.combineCss = function (path) {
  var lessStream = gulp.src(path.less)
      .pipe(less())
  var scssStream = gulp.src(path.scss)
      .pipe(scss())
  var sassStream = gulp.src(path.sass)
      .pipe(sass())
  var pCssStream = gulp.src(path.pcss)
      .pipe(postCss())
  var stylusStream = gulp.src(path.styl)
      .pipe(stylus())
  var cssStream = gulp.src(path.css)
  var mergedStream = merge(cssStream,lessStream,scssStream,sassStream,pCssStream,stylusStream)
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('dist/css'))
      .pipe(cssnano())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/css'));
  return mergedStream;
}
exports.combinePug = function(path){
  return gulp.src(path)
        .pipe(pug({
          pretty :true
        }))
        .pipe(gulp.dest('dist/'));
};
exports.combineHandlebars = function(path){
  return  gulp.src(path)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'App.templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist/assets'));
};
exports.combineMustache = function(path){
  return gulp.src(path.mustache)
  .pipe(mustache(path.json,{extension:'html'},{}))
  .pipe(gulp.dest('dist'));
};
exports.combineAssets = function(path){
  return gulp.src(path, {since: gulp.lastRun('assets')})
  .pipe(gulp.dest('dist/assets'));
};
