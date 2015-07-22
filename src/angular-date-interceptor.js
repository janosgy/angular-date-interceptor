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

    function convertToDate(input) {
      angular.forEach(input, function (value, key) {
        if (angular.isString(value) && iso8601.test(value)) {
          input[key] = new Date(value);
        }  else if (angular.isObject(value)) {
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
