const pathJs = 'src/js/**/*.js';
const pathPug = 'src/pug/**/*.pug';
const pathHandlebars = 'src/templates/*.html';
const pathAssets = 'src/assets/**/*.*';
const pathMustache = {
  mustache :'src/mustache/*.mustache',
  json : 'src/mustache/data.json'
};
const pathCss = {
  less : 'src/styles/**/*.less',
  scss : 'src/styles/**/*.scss',
  sass : 'src/styles/**/*.sass',
  pcss : 'src/styles/**/*.pcss',
  styl : 'src/styles/**/*.styl',
  css  : 'src/styles/**/*.css'
};
const gulp         = require('gulp');
const del          = require('del');
const browserSync  = require('browser-sync').create();
const myTask       = require('./gulp-tasks/index');

gulp.task('js',function () {
  return myTask.combineJs.combineJs(pathJs);
});
gulp.task('combine-css', function () {
  return myTask.combineCss.combineCss(pathCss);
});
gulp.task('pug', function () {
  return myTask.combinePug.combinePug(pathPug);
});
gulp.task('templates', function(){
  return myTask.combineHandlebars.combineHandlebars(pathHandlebars);
});
gulp.task('mustache',function() {
  return myTask.combineMustache.combineMustache(pathMustache);
});
gulp.task('assets', function () {
  return myTask.combineAssets.combineAssets(pathAssets);
});
gulp.task('clean', async function() {
    return del.sync('dist');
});
gulp.task('build', gulp.series('clean','combine-css','assets','pug','js','templates','mustache','templates'));
gulp.task('serve',function(){
  browserSync.init({
    server:'dist'
  });
browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});
gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.*', gulp.parallel('combine-css'));
    gulp.watch('src/pug/**/*.pug', gulp.parallel('pug'));
    gulp.watch('src/js/**/*.pug', gulp.parallel('js'));
});
gulp.task('dev', gulp.series('build',gulp.parallel('watch','serve')));
