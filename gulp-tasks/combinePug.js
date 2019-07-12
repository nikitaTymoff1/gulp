const gulp = require('gulp');
const pug  = require('gulp-pug');

exports.combinePug = function(path){
  return gulp.src(path)
  .pipe(pug({
    pretty :true
    }))
  .pipe(gulp.dest('dist/'));
};
