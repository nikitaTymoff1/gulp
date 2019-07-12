const gulp = require('gulp');
exports.combineAssets = function(path){
  return gulp.src(path )
  .pipe(gulp.dest('dist/assets'));
};
