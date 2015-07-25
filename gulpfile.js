'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  del = require('del'),
  karmaServer = require('karma').Server;

var destDir = 'dist/',
  srcFiles = 'src/**/*.js',
  testFiles = 'test/**/*.js',
  karmaConf = __dirname + '/karma.conf.js',
  appName = 'angular-date-interceptor';

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('clean', function (cb) {
  del(destDir, cb);
});

gulp.task('lint', function () {
  return gulp.src([srcFiles, testFiles])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('test', ['lint'], function (done) {
  return new karmaServer({
    configFile: karmaConf,
    singleRun: true
  }, done).start();
});

gulp.task('default', function (done) {
  new karmaServer({
    configFile: karmaConf,
    singleRun: false
  }, done).start();
});

gulp.task('dist', ['clean', 'lint', 'test'], function () {
  return gulp.src(srcFiles)
    .pipe($.concat(appName + '.js'))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest('dist'))
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe($.concat(appName + '.min.js'))
    .pipe(gulp.dest('dist'));
});
