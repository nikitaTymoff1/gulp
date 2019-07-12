const gulp     = require('gulp');
const mustache = require('gulp-mustache');

exports.combineMustache = function(path){
  return gulp.src(path.mustache)
  .pipe(mustache(path.json,{extension:'html'},{}))
  .pipe(gulp.dest('dist'));
};
