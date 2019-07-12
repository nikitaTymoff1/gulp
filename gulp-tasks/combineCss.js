const gulp         = require('gulp');
const stylus       = require('gulp-stylus');
const sass         = require('gulp-sass');
const scss         = require('gulp-scss');
const postCss      = require('gulp-postcss');
const less         = require('gulp-less');
const concat       = require('gulp-concat');
const merge        = require('merge-stream');
const minify       = require('gulp-minify-css');
const cssnano      = require('gulp-cssnano');
const rename       = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

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
