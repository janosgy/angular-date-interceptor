'use strict';

var config = require('./build.config.js'),
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  del = require('del'),
  karmaServer = require('karma').Server;

gulp.task('clean', function (cb) {
  del(config.destDir, cb);
});

gulp.task('lint', function () {
  return gulp.src([config.srcFiles, config.testFiles])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('test', ['lint'], function (done) {
  return new karmaServer({
    configFile: config.karmaConf,
    singleRun: true
  }, done).start();
});

gulp.task('default', function (done) {
  new karmaServer({
    configFile: config.karmaConf,
    singleRun: false
  }, done).start();
});

gulp.task('dist', ['clean', 'lint', 'test'], function () {
  return gulp.src(config.srcFiles)
    .pipe($.concat(config.pkg.name + '.js'))
    .pipe($.header(config.banner, {pkg: config.pkg}))
    .pipe(gulp.dest(config.destDir))
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe($.concat(config.pkg.name + '.min.js'))
    .pipe(gulp.dest(config.destDir));
});
