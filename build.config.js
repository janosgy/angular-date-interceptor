'use strict';

module.exports = {
  destDir: 'dist/',
  srcFiles: 'src/**/*.js',
  testFiles: 'test/**/*.js',
  karmaConf: __dirname + '/karma.conf.js',

  pkg: require('./package.json'),
  banner: ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n')
};
