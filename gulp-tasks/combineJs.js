const gulp         = require('gulp');
const concat       = require('gulp-concat');
const rename       = require('gulp-rename');
const uglify       = require('gulp-uglify');

exports.combineJs = function(path){
  return gulp.src(path)
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/js'));
};
