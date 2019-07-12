const gulp         = require('gulp');
const concat       = require('gulp-concat');
const handlebars   = require('gulp-handlebars');
const wrap         = require('gulp-wrap');
const declare      = require('gulp-declare');

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
