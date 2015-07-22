(function () {

  'use strict';

  angular.module('angularDateInterceptor', [])
    .service('angularDateInterceptor', AngularDateInterceptor)
    .config(config);

  function AngularDateInterceptor() {
    var iso8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

    this.response = function (response) {
      convertToDate(response.data);
      return response;
    };

    function isIso8601(value) {
      return angular.isString(value) && iso8601.test(value);
    }

    function convertToDate(input) {
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
