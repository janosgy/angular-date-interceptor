/**
 * angular-date-interceptor - An AngularJS interceptor to parse dates from server response
 * @version v1.0.0
 * @link https://github.com/ins87/angular-date-interceptor
 * @license MIT
 */
(function () {

  'use strict';

  angular.module('angularDateInterceptor', [])
    .service('angularDateInterceptor', AngularDateInterceptor)
    .config(config);

  function AngularDateInterceptor() {
    var iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

    this.response = function (response) {
      convertToDate(response.data);
      return response;
    };

    function isIso8601(value) {
      return angular.isString(value) && iso8601.test(value);
    }

    function convertToDate(input) {
      if (!angular.isObject(input)) {
        return input;
      }

      angular.forEach(input, function (value, key) {
        if (isIso8601(value)) {
          input[key] = new Date(value);
        } else if (angular.isObject(value)) {
          convertToDate(value);
        }
      });
    }
  }

  config.$inject = ['$httpProvider'];
  function config($httpProvider) {
    $httpProvider.interceptors.push('angularDateInterceptor');
  }

})();
