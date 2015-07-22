(function () {

  'use strict';

  angular.module('angularDateInterceptor', [])
    .service('angularDateInterceptor', AngularDateInterceptor)
    .config(config);

  function AngularDateInterceptor() {
  }

  config.$inject = ['$httpProvider'];
  function config($httpProvider) {
    $httpProvider.interceptors.push('angularDateInterceptor');
  }

})();
